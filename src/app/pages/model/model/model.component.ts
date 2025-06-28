import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { DataService, ModelType } from '../../../core/data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SystemService } from '../../../core/system.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model',
  standalone: false,
  templateUrl: './model.component.html',
  styleUrl: './model.component.less'
})
export class ModelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ViewContainer') viewContainer: ElementRef | undefined;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private controls!: OrbitControls | undefined;
  private animationFrameId!: number | undefined;

  // view
  public isModelNotFounded: boolean = false;
  public isModelLoadFail: boolean = false;
  public loadProcess: number = -1;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private systemService: SystemService,
    private location: Location
  ) {
    // 1. 创建场景、相机和渲染器
    this.scene = new THREE.Scene();
  }

  ngAfterViewInit(): void {
    this.initThreeJs();
    this.loadData();
    this.listenScreenResize();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.renderer?.dispose();
    this.controls?.dispose();
  }

  public loadData(): void {
    this.isModelLoadFail = false;
    this.scene.clear();
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.dataService.getDataById(id).subscribe(res => {
      switch(res?.modelType) {
        case ModelType.Ply:
          this.loadPlyFile(res.modelUrl);
          break;
        case ModelType.Gltf:
          this.loadGltfFile(res.modelUrl);
          break;
        case ModelType.Obj:
          this.loadObjFile(res.modelUrl);
          break;
      }
      this.addSceneAsset();
      this.animate();
    }, () => this.isModelNotFounded = true)
  }

  private initThreeJs(): void {
    // 初始化
    this.camera = new THREE.PerspectiveCamera(75, this.viewContainer?.nativeElement.clientWidth / this.viewContainer?.nativeElement.clientWidth, 0.1, 3000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewContainer?.nativeElement.clientWidth, this.viewContainer?.nativeElement.clientWidth);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.viewContainer?.nativeElement.appendChild(this.renderer.domElement);

    // 4. 添加控制
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  private addSceneAsset(): void {
    // 坐标轴辅助
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);
    // 5. 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // // 添加网格辅助线
    // const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xcccccc);
    // this.scene.add(gridHelper);
  }

  private loadPlyFile(url: string): void {
    const loader = new PLYLoader();
    loader.load(url, (geometry) => {
      // 4. 创建点云材质
      const material = new THREE.PointsMaterial({
        size: 0.001,          // 点的大小（单位：像素）
        // color: 0xff0000,
        vertexColors: true,   // 使用顶点颜色（如果PLY包含颜色数据）
      });

      // // 5. 生成点云对象并添加到场景
      const points = new THREE.Points(geometry, material);
      this.scene.add(points);

      this.centerAndFrameModel(points);

      this.controls!.update();
      this.loadProcess = -1;
    },  (xhr) => {
      // 加载进度回调
      this.loadProcess = Math.ceil(xhr.loaded / xhr.total * 100);
    },
    (error) => {
      this.isModelLoadFail = true;
      console.error('加载点云失败:', error);
    })
  }

  private loadGltfFile(url: string): void {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      this.scene.add(gltf.scene);

      this.centerAndFrameModel(gltf.scene);

      this.controls!.update();
      this.loadProcess = -1;
    }, (xhr) => {
      // 加载进度回调
      this.loadProcess = Math.ceil(xhr.loaded / xhr.total * 100);
    },
    (error) => {
      this.isModelLoadFail = true;
      console.error('加载点云失败:', error);
    })
  }

  private centerAndFrameModel(model: any) {
    // 计算模型的边界框
    const box = new THREE.Box3().setFromObject(model);

    // 计算模型中心
    const center = box.getCenter(new THREE.Vector3());

    // 将模型移动到原点
    model.position.sub(center);

    // 计算模型尺寸
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // 计算合适的相机距离
    const fov = this.camera!.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    // 添加一些边距
    cameraZ *= 1.5;

    // 设置相机位置
    this.camera!.position.set(cameraZ, cameraZ, cameraZ);
    this.camera!.lookAt(0, 0, 0);

    // 更新控制器
    this.controls!.target.set(0, 0, 0);
    this.controls!.update();
  }

  private loadObjFile(url: string): void {
    const loader = new OBJLoader();
    loader.load(url, (obj) => {
      this.scene.add(obj);

      this.centerAndFrameModel(obj);

      this.controls!.update();
      this.loadProcess = -1;
    }, (xhr) => {
      // 加载进度回调
      this.loadProcess = Math.ceil(xhr.loaded / xhr.total * 100);
    },
    (error) => {
      this.isModelLoadFail = true;
      console.error('加载点云失败:', error);
    })
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    // 更新控制器
    this.controls?.update();
    // 渲染场景
    this.renderer?.render(this.scene, this.camera!);
  }

  private listenScreenResize(): void {
    this.systemService.getScreenSize().subscribe(() => {
      this.camera!.aspect = this.viewContainer?.nativeElement.clientWidth / this.viewContainer?.nativeElement.clientHeight;
      this.camera!.updateProjectionMatrix();
      this.renderer!.setSize(this.viewContainer?.nativeElement.clientWidth, this.viewContainer?.nativeElement.clientHeight);
    })
  }

  public navigateBack(): void {
    this.location.back();
  }
}
