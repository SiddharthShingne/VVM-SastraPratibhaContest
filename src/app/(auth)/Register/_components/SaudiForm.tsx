type Props = {
    country?: { value: string; label: string; code: string };
};

const SaudiForm = ({ country }: Props) => {
    return (
        <div className="bg-white/30 rounded-2xl p-5 border border-white/50">
            saudi form
            {/* Add Saudi-specific form fields here */}
        </div>
    );
};

export default SaudiForm;