export default function Level2examSif() {
    return (<div className="max-w-4xl mx-auto bg-white rounded-lg border border-[#7F7BDA] overflow-hidden">
  {/* Simple Header */}
  <div className="bg-[#7F7BDA] px-6 py-4">
    <h2 className="text-xl font-bold text-white">LEVEL 2 EXAM SIF</h2>
  </div>

  {/* Simple List */}
  <div className="p-6 space-y-4">
    {/* Point 1 */}
    <div className="flex gap-3">
      <span className="font-medium  w-6">1.</span>
      <p className="text-gray-700 text-sm">A Mock Test (Level 2 Exam) is conducted to help students experience the real exam environment and become familiar with the Exam App and its features.</p>
    </div>

    {/* Point 2 */}
    <div className="flex gap-3">
      <span className="font-medium w-6">2.</span>
      <p className="text-gray-700 text-sm">Ensure that your mobile devices or laptops are fully charged before starting the exam.</p>
    </div>

    {/* Point 3 */}
    <div className="flex gap-3">
      <span className="font-medium  w-6">3.</span>
      <p className="text-gray-700 text-sm">Disable screen lock or increase the screen idle time during the exam to avoid the device locking automatically, as this will be counted as a "minimize" attempt.</p>
    </div>

    {/* Point 4 */}
    <div className="flex gap-3">
      <span className="font-medium  w-6">4.</span>
      <p className="text-gray-700 text-sm">The Level 2 Exam will be based on the Study Material available on the VVM website for the years 2025–26.</p>
    </div>

    {/* Point 5 */}
    <div className="flex gap-3">
      <span className="font-medium t w-6">5.</span>
      <div className="text-gray-700 text-sm">
        <p>The Level 2 Exam will be of 45 minutes duration and will be held as per the schedule below:</p>
        <p className="ml-4 mt-1">a) BAHRAIN & KSA - 29th Nov 2025, from 1:30 PM to 5:30 PM – (Bahrain/KSA time)</p>
        <p className="ml-4">b) UAE - 17th January 2026, (Timing will be notified)</p>
      </div>
    </div>

    {/* Points 6-11 */}
    <div className="flex gap-3">
      <span className="font-medium  w-6">6.</span>
      <p className="text-gray-700 text-sm">Students must take the exam in one sitting.</p>
    </div>

    <div className="flex gap-3">
      <span className="font-medium  w-6">7.</span>
      <p className="text-gray-700 text-sm">If a student finishes Section A early, time remaining will not be carried forward.</p>
    </div>

    <div className="flex gap-3">
      <span className="font-medium  w-6">8.</span>
      <p className="text-gray-700 text-sm">Minimizing the app more than three times will lead to automatic termination of the exam.</p>
    </div>

    <div className="flex gap-3">
      <span className="font-medium  w-6">9.</span>
      <p className="text-gray-700 text-sm">If a student is unable to complete Section A within the allotted time, the system will automatically redirect them to Section B.</p>
    </div>

    <div className="flex gap-3">
      <span className="font-medium  w-6">10.</span>
      <p className="text-gray-700 text-sm">Follow the steps provided in the Exam App to take the final exam.</p>
    </div>

    <div className="flex gap-3">
      <span className="font-medium  w-6">11.</span>
      <p className="text-gray-700 text-sm">Do not minimize the app, toggle Internet/WiFi, adjust power/sound/camera buttons, or switch between apps/tabs. Three such actions will cause the exam to end automatically.</p>
    </div>

    {/* Point 12 - Mobile Users */}
    <div className="flex gap-3 mt-2">
      <span className="font-medium  w-6">12.</span>
      <div className="text-gray-700 text-sm">
        <p className="font-medium">For Mobile Users:</p>
        <p className="ml-4 mt-1">a) The Exam App will switch to Offline Mode at a certain point. When prompted, turn off Internet and WiFi or enable Airplane Mode. You cannot proceed until this is done.</p>
        <p className="ml-4 mt-1">b) After completing the exam, turn on Internet/WiFi or disable Airplane Mode when prompted so that you can upload your answer sheet.</p>
        <p className="ml-4 mt-1">c) If you lose connectivity, reopen the app once the internet is restored and then submit your answer sheet.</p>
      </div>
    </div>
  </div>
</div>
    ) 
}