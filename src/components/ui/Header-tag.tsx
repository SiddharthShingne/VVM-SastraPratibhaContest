interface HeaderTagProps {
    title: string;
    breadcrumb?: string;
}

export default function HeaderTag({ title, breadcrumb }: HeaderTagProps) {
    return (
        <div className="bg-[#e9edf5] py-8 text-center">
            {/* Reduced height: py-8 instead of py-16 */}

            <h1 className="text-3xl md:text-4xl font-bold text-[#1f2a44]">
                {title}
            </h1>

            {breadcrumb && (
                <p className="mt-2 text-sm font-medium text-gray-600">
                    Home <span className="mx-2 text-gray-400">›</span> {breadcrumb}
                </p>
            )}
        </div>
    );
}