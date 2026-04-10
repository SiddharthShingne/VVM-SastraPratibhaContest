type Props = {
    country?: { value: string; label: string; code: string };
};

const KuwaitForm = ({ country }: Props) => {
    return (
        <div className="bg-white/30 rounded-2xl p-5 border border-white/50">
            kuwait form
            {/* Add Kuwait-specific form fields here */}
        </div>
    );
};

export default KuwaitForm;