import { Card, Skeleton } from "antd";

const TileSkeletonCard = () => (
	<Card className="h-full shadow-md !rounded-button">
		<Skeleton.Image className="w-full h-48" active />
		<Skeleton active paragraph={{ rows: 3 }} />
		<div className="mt-4">
			<Skeleton.Button active className="w-full" />
		</div>
	</Card>
);

const MobileTileSkeleton = () => (
	<Card className="h-full shadow-md!rounded-button">
		<div className="flex gap-2.5">
			<Skeleton.Image className="w-full h-20" active />
			<div className="flex-1">
				<Skeleton active paragraph={{ rows: 1 }} />
				<div className="mt-1">
					<Skeleton.Button active className="w-full" />
				</div>
			</div>
		</div>
	</Card>
);

export { TileSkeletonCard, MobileTileSkeleton };
