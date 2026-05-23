type PageHeaderProps = {
	title: string;
	description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<div className="mb-8 text-center">
			<h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
				{title}
			</h1>
			{description && <p className="mt-2">{description}</p>}
		</div>
	);
}
