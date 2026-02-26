export default function DashboardHome() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8">
      <h2 className="text-center text-[17px] font-semibold tracking-wide text-gray-800 mb-6">
        IMPORTANT DATES TO REMEMBER
      </h2>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#d8dced] text-gray-800">
            <tr>
              <th className="p-3 text-left border-r">Sr. No.</th>
              <th className="p-3 text-left border-r">Name</th>
              <th className="p-3 text-left">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-t">
              <td className="p-3 border-r">1</td>
              <td className="p-3 border-r font-medium">Level 1 Exam</td>
              <td className="p-3">
                GCC - November 8 for all GCC countries for all classes.
              </td>
            </tr>
            <tr className="border-t bg-[#f7f8fc]">
              <td className="p-3 border-r">2</td>
              <td className="p-3 border-r font-medium">Level 2 Exam</td>
              <td className="p-3">
                For International students contact Science India/International forum.
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3 border-r">3</td>
              <td className="p-3 border-r font-medium">State Camp</td>
              <td className="p-3">
                Contact respective international forum for more details.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}