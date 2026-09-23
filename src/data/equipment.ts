export interface Equipment {
	name: string;
	category: string;
	purpose: string;
	areas: string[];
	/** 未着の機材は到着予定を入れる（例: 'December 2026'） */
	arriving?: string;
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
		purpose: 'Research platform for robot foundation models, including VLA and tactile manipulation tasks.',
		areas: ['Robot Foundation Models', 'VLA', 'Tactile Sensing'],
	},
	{
		name: 'TurtleBot3 Burger',
		category: 'Mobile Robot',
		purpose: 'SLAM and ROS 2 development, and teleoperation through mixed reality (MR).',
		areas: ['SLAM', 'ROS 2', 'Mixed Reality'],
	},
	{
		name: 'Intel RealSense',
		category: 'Depth Camera',
		purpose: 'Recording SO-101 tactile manipulation tasks for research datasets.',
		areas: ['Tactile Sensing', 'Data Collection'],
	},
	{
		name: 'Livox Mid-360',
		category: 'LiDAR',
		purpose: 'Capturing point clouds for spatial AI research, especially Gaussian Splatting for robotics.',
		areas: ['Spatial AI', 'Gaussian Splatting', 'Point Clouds'],
	},
	{
		name: 'Meta Quest 3',
		category: 'XR Headset',
		purpose: 'XR interfaces for robots and spatial AI research.',
		areas: ['XR', 'Spatial AI'],
	},
	{
		name: 'Microduck',
		category: 'Biped Robot',
		purpose: 'A 25 cm open-source biped robot from Pollen Robotics with a camera, LiDAR and a grasping beak.',
		areas: ['Legged Robots'],
		arriving: 'December 2026',
		url: 'https://pollen-robotics.com/microduck/',
	},
];
