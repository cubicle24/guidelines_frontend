import Image from "next/image";
import { useState } from "react";
import { getRecommendations, Recommendation } from "../services/api";

export default function ScreeningGuidelines() {
    const [patientNote, setPatientNote] = useState("The patient is a 58 year-old female with a history of hypertension, diabetes, and depression.");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        console.log("Patient Note:", patientNote);
        let clinicalNote = {"clinical_note": patientNote};
        const data = await getRecommendations(clinicalNote);
        console.log("Recommendations:", data.recommendations);
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch recommendations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#f0f2ff] to-[#f5eeff] flex flex-col items-center justify-center p-6 text-3xl">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-1">
          CLINICAL GUIDELINES
        </h1>
        <h2 className="text-3xl font-medium text-center text-gray-600 mb-6">
          Decision Support System
        </h2>
  
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Patient Note</h3>
          <textarea
            className="border border-purple-200 p-4 rounded-lg text-gray-800 text-lg w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 mb-2"
            placeholder="Enter patient note here..."
            value={patientNote}
            onChange={(e) => setPatientNote(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button 
              className="bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Go"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
  
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl">
          <h3 className="text-md font-semibold text-gray-700 mb-4">
            Your Patient's Evidence-based Screening Recommendations
          </h3>
  
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="border border-purple-200 rounded-lg p-4 mb-3 last:mb-0">
                <p className="text-sm text-gray-800">
                  {rec.text}
                </p>
                <div className="flex justify-end mt-2">
                  <span className={`${rec.grade === 'A' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'} text-xs font-bold px-2 py-1 rounded-full`}>
                    {rec.grade}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="border border-purple-200 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-800">
                  Screen for breast cancer with mammography every 2 years for women aged 50 to 74 years.
                </p>
                <div className="flex justify-end mt-2">
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                    B
                  </span>
                </div>
              </div>
        
              <div className="border border-purple-200 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-800">
                  Offer annual screening for lung cancer with low-dose CT in adults aged 50 to 80 years
                  with a 20 pack-year smoking history and currently smoke or have quit within the past 15 years
                </p>
                <div className="flex justify-end mt-2">
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                    B
                  </span>
                </div>
              </div>
        
              <div className="border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-800">
                  Screen for colorectal cancer starting at age 45 years and continuing until age 75 years
                </p>
                <div className="flex justify-end mt-2">
                  <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">
                    A
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}