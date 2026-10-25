export interface Equipment {
	name: string;
	category: string;
	categoryJa: string;
	purpose: string;
	purposeJa: string;
	areas: string[];
	/** 未着の機材は到着予定を入れる（例: 'December 2026' / '2026年12月'） */
	arriving?: string;
	arrivingJa?: string;
	url?: string;
}

/**
 * 所有しているロボット・機材はここに追加すると /equipment に表示されます。
 * `arriving` を指定したものは「Arriving Soon」に表示されます。
 */
export const equipment: Equipment[] = [
	{
		name: 'SO-101',
		category: 'Robot Arm',
		categoryJa: 'ロボットアーム',
		purpose: 'Research platform for robot foundation models, including VLA and tactile manipulation tasks.',
		purposeJa: 'VLAや触覚を使ったマニピュレーションタスクなど、ロボット基盤モデルの研究プラットフォーム。',
		areas: ['Robot Foundation Models', 'VLA', 'Tactile Sensing'],
	},
	{
		name: 'TurtleBot3 Burger',
		category: 'Mobile Robot',
		categoryJa: '移動ロボット',
		purpose: 'SLAM and ROS 2 development, and teleoperation through mixed reality (MR).',
		purposeJa: 'SLAMとROS 2の開発、複合現実（MR）による遠隔操作。',
		areas: ['SLAM', 'ROS 2', 'Mixed Reality'],
	},
	{
		name: 'Intel RealSense D435',
		category: 'Depth Camera',
		categoryJa: '深度カメラ',
		purpose: 'Recording SO-101 tactile manipulation tasks for research datasets.',
		purposeJa: '研究用データセットのため、SO-101による触覚マニピュレーションタスクを記録。',
		areas: ['Tactile Sensing', 'Data Collection'],
	},
	{
		name: 'Livox Mid-360',
		category: 'LiDAR',
		categoryJa: 'LiDAR',
		purpose: 'Capturing point clouds for spatial AI research, especially Gaussian Splatting for robotics.',
		purposeJa: '空間AI研究、特にロボティクス向けGaussian Splattingのための点群取得。',
		areas: ['Spatial AI', 'Gaussian Splatting', 'Point Clouds'],
	},
	{
		name: 'Meta Quest 3',
		category: 'XR Headset',
		categoryJa: 'XRヘッドセット',
		purpose: 'XR interfaces for robots and spatial AI research.',
		purposeJa: 'ロボットと空間AI研究のためのXRインターフェース。',
		areas: ['XR', 'Spatial AI'],
	},
	{
		name: 'Microduck',
		category: 'Biped Robot',
		categoryJa: '二足歩行ロボット',
		purpose: 'A 25 cm open-source biped robot from Pollen Robotics with a camera, LiDAR and a grasping beak.',
		purposeJa: 'Pollen Roboticsによる身長25cmのオープンソース二足歩行ロボット。カメラ、LiDAR、物をつかめるくちばしを搭載。',
		areas: ['Legged Robots'],
		arriving: 'December 2026',
		arrivingJa: '2026年12月',
		url: 'https://pollen-robotics.com/microduck/',
	},
];
