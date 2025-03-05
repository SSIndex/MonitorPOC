// Dummy DatePicker Component (Placeholder)
export default function DatePickerYearly() {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <p>Timeframe:</p>
      <select className="mt-2 p-2 border rounded-md text-gray-700 bg-white">
        <option>Dec 2025 - Dec 2024</option>
        <option>Dec 2024 - Dec 2023</option>
        <option>Dec 2023 - Dec 2022</option>
      </select>
    </div>
  );
}
