'use client';

type ProgressBarProps = {
	currentStep: number;
	steps: string[];
};

export default function ProgressBar({ currentStep, steps }: ProgressBarProps) {
	const totalSteps = steps.length;
	const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100);

	return (
		<div className="mb-8 w-full">
			<div className="flex justify-between text-sm font-medium mb-2 px-1 text-gray-400">
				{steps.map((stepName, index) => {
					const stepNumber = index + 1;
					const isActiveOrPassed = currentStep >= stepNumber;

					return (
						<span
							key={stepName}
							className={
								isActiveOrPassed ? 'text-(--second-color) font-bold' : ''
							}>
							{stepNumber}. {stepName}
						</span>
					);
				})}
			</div>
			<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
				<div
					className="h-full bg-(--second-color) transition-all duration-500 ease-in-out"
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>
		</div>
	);
}
