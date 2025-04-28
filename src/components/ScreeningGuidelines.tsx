import Image from "next/image";
import { useState } from "react";
import { getRecommendations, Recommendation } from "../services/api";

export default function ScreeningGuidelines() {
    const [patientNote, setPatientNote] = useState("The patient is a 58 year-old female with a history of hypertension, diabetes, and depression.");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [additional_recommendations, setAdditionalRecommendations] = useState<Recommendation[]>([]);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        console.log("Patient Note:", patientNote);
        let clinicalNote = {"clinical_note": patientNote};
        const data = await getRecommendations(clinicalNote);
        console.log("Recommendations:", data.recommendations);
        setRecommendations(data.recommendations.recommendations || []);
        setAdditionalRecommendations(data.recommendations.additional_recommendations || []);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch recommendations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 to-sky-175 flex flex-col items-center justify-top mt-36 px-36 py-36 text-3xl">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-1">
          CLINICAL GUIDELINES
        </h1>
        <h2 className="text-3xl font-medium text-center text-gray-600 mb-20">
          Decision Support System
        </h2>
  
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Patient Note</h3>
          <textarea
            className="border border-sky-100 p-4 rounded-lg text-gray-800 text-lg w-full h-64 focus:outline-none focus:ring-2 focus:ring-sky-200 mb-2"
            placeholder="Enter patient note here..."
            value={patientNote}
            onChange={(e) => setPatientNote(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button 
              className="bg-sky-300 hover:bg-sky-400 text-white font-medium py-2 px-4 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110 disabled:opacity-60"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing . . ." : "Go"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
  
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl">
          <h3 className="text-md font-semibold text-gray-700 mb-14">
            Your Patient's Personalized Screening Recommendations
          </h3>
  
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="border border-sky-100 rounded-lg p-4 mb-3 last:mb-0 text-lg text-gray-700">
                <p className="text-lg text-blue-600 font-bold mb-4">{rec.test}:</p>
                <p className="mb-2">{rec.justification}</p>
                {/* {rec.pub_date} */}
                <div className="flex justify-end mt-2">
                  <span className={`${rec.governing_body === 'USPSTF' ? 'bg-sky-100 text-sky-800' : 'bg-sky-200 text-sky-800'} text-xs font-bold px-2 py-1 rounded-full`}>
                    US Preventive Services Task Force
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
            </>
          )}
          {additional_recommendations.length > 0 ? (
            additional_recommendations.map((rec, index) => (
              <div key={index} className="border border-sky-100 rounded-lg p-4 mb-3 last:mb-0 text-lg text-gray-700">
                <p className="text-lg text-blue-600 font-bold mb-4">{rec.test}:</p>
                <p className="mb-2">{rec.justification}</p>
                {/* {rec.pub_date} */}
                <div className="flex justify-end mt-2">
                  <span className={`${rec.governing_body === 'USPSTF' ? 'bg-sky-100 text-sky-800' : 'bg-sky-200 text-sky-800'} text-xs font-bold px-2 py-1 rounded-full`}>
                    US Preventive Services Task Force
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    );
}