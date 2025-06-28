import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly MOCK_BANNER: BannerData[] = [
    { imageUrl: 'lab.png', alt: '园区', link: '' },
    { imageUrl: 'banner1.png', alt: '', link: '' },
    { imageUrl: 'banner2.png', alt: '', link: '' },
  ];
  private readonly MOCK_LIST: ListData[] = [
    {
      id: '1',
      title: '元素3D点云',
      description: '元素结构图是直观呈现原子内部构造的科学模型，它以原子核（含质子和中子）为中心，通过环绕的电子层及电子轨道分布清晰展示核外电子排布规律（如能级、轨道形状与电子自旋），同时标注元素关键参数（原子序数、电子数、质量数等），从而揭示元素的化学性质（如价电子决定反应活性）、物理特性（如电离能与电负性）及在周期表中的位置规律，为理解化学键形成、元素周期律、光谱现象乃至量子力学原理提供可视化基础，是化学、材料科学和核物理研究不可或缺的分析工具。',
      coverImageUrl: 'images/element.png',
      modelUrl: '3d.spz',
      modelType: ModelType.Ply,
      type: DeviceType.material,
    },
    {
      id: '2',
      title: '装置',
      description: '作为现代实验室精密检测的核心设备，通过全自动电动变焦系统与物镜转盘实现一键切换七种观察模式，支持26X至7300X的宽范围光学放大，并搭载4K级超高清成像技术，可无缝捕捉从宏观结构至微米级缺陷的高分辨率图像；其集成的人工智能辅助系统（如PRECiV软件的Live AI功能）能实时识别样品隐藏特征、自动标注关键区域并执行精准测量，大幅降低人工操作误差，同时依托云端协作与远程控制模块，用户可通过手机或电脑远程监控实验进程、调用历史数据并生成定制化报告，显著优化了材料分析、失效检测及质量控制领域的工作流程，为跨学科研究提供高效、可靠的技术支撑。',
      coverImageUrl: 'images/device.png',
      modelUrl: 'models/sci_fi_lab_gltf/scene.gltf',
      modelType: ModelType.Gltf,
      type: DeviceType.device,
    },
    {
      id: '3',
      title: '量瓶',
      description: '量瓶是一种用于测量液体体积的计量器具，其形状为细颈梨形，通常由无色或棕色玻璃制成，颈部有刻度标识，表示在特定温度下（一般为20℃）液体充满至标线时的容积。量瓶的主要功能是用于准确配制标准溶液和稀释溶液，常见的规格有5ml、25ml、50ml、100ml等。与量筒不同，量瓶的设计更注重测量的准确性。',
      coverImageUrl: 'images/bottle.png',
      modelUrl: 'models/glass_carafe_flagon_with_cork_gltf/scene.gltf',
      modelType: ModelType.Gltf,
      type: DeviceType.device,
    },
    {
      id: '4',
      title: '显微镜1',
      description: '显微镜是人类洞察微观世界不可或缺的关键工具，它通过精妙的光学透镜或高能电子束将肉眼无法分辨的微小物体进行显著放大并形成清晰影像，从而揭示出细胞、微生物、矿物晶体、材料结构等隐藏的精细细节；作为连接宏观与微观的桥梁，显微镜在生命科学研究、医学诊断、材料科学分析、工业质量检测以及教育教学等众多领域发挥着不可替代的核心作用，极大地拓展了人类的认知边界和探索能力。',
      coverImageUrl: 'images/microscope1.png',
      modelUrl: 'models/microscope/scene.gltf',
      modelType: ModelType.Gltf,
      type: DeviceType.device,
    },
    {
      id: '5',
      title: '显微镜2',
      description: '显微镜自诞生起便不断突破人类视觉的边界，从最初简单的光学放大装置，演进为如今融合精密光学、电子物理、激光技术和数字成像的强大系统，它不仅让我们得以清晰地窥见细胞分裂的瞬间、病毒的结构乃至原子级别的物质排列，更通过诸如荧光标记、共聚焦层扫、超分辨成像等尖端技术，在时间与空间维度上动态解析着生命活动和物质变化的深层奥秘，成为推动现代科学发现从微观层面取得革命性进展的基石。',
      coverImageUrl: 'images/microscope2.png',
      modelUrl: 'models/microscope (1)/scene.gltf',
      modelType: ModelType.Gltf,
      type: DeviceType.device,
    },
  ];

  public getBanners(): Observable<BannerData[]> {
    return of(this.MOCK_BANNER);
  }

  public getList(): Observable<ListData[]> {
    return of(this.MOCK_LIST);
  }

  public getDataById(id: string): Observable<ListData | undefined> {
    return of(this.MOCK_LIST).pipe(
      map((list) => list.find((item) => item.id === id)),
      tap((res) => {
        if (!res) {
          throw new Error('Data not Founded!');
        }
      })
    );
  }
}
export enum ModelType {
  Ply = 'ply',
  Gltf = 'gltf',
  Obj = 'obj'
}
export enum DeviceType {
  device = 'device',
  material = 'material'
}
export interface ListData {
  id: string,
  title: string,
  description: string,
  modelUrl: string,
  coverImageUrl: string,
  modelType: ModelType,
  type: DeviceType
}
export interface BannerData {
  imageUrl: string;
  alt: string;
  link: string;
}
