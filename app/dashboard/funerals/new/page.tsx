import FuneralWizard from "@/app/components/FuneralWizard";

export default function NewFuneralPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8 w-full max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold text-gray-800">
                    Nowa Ceremonia
                </h1>
                <p className="text-gray-500 mt-2">
                    Wypełnij poniższe kroki, aby dodać nowy pogrzeb do systemu.
                </p>
            </div>
            <FuneralWizard />
        </div>
    );
}