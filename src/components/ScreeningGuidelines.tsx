import Image from "next/image";
import { useState } from "react";
import { getRecommendations, Recommendation } from "../services/api";

export default function ScreeningGuidelines() {
    const [patientNote, setPatientNote] = useState("");
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
        <h2 className="text-3xl font-medium text-center text-gray-600 mb-10">
          Decision Support System
        </h2>
        <div className="instructions text-lg text-gray-700 italic mb-6">
          <ol>
            <li>To get started, type in a patient's note and press go.</li>
            <li>You can also choose from some pre-written patient notes.</li>
          </ol>
        </div>

        <div className="prepopulated-patients mb-8">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setPatientNote("Patient is a 52 year old female. She smokes, drinks 5 beers per day.  She currently has been coughing for at least 2 months. She had a low-dose CT scan of her chest six months ago that was normal. Her last colonoscopy was 1 year ago, and it was normal.She reports feeling sad and without purpose after her husband passed away six months ago.  She is not eating well and is sleeping very little. The patient's mother died of breast cancer at age 45. The patient has a black eye, and bruises on her arms. Her blood pressure is 190/100 today. She is overweight now, having gained 15 pounds since last visit.  She reports eating lots of carbohydrates and junk food.")}
            >
              Rebecca Lee
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setPatientNote("Patient is a 68 year old male. The patient smoked 35 years ago, but no longer does.  He has had angina in the past ten years, and required 2 stents 3 years ago.  He reports being unsteady on his feet, and he walks with a cane now. He reports that he has a family history of prostate cancer in his father who was 80 when diagnosed.  His mother had low bone density at age 65.  His blood pressure today is 180/85, but he feels fine. He mentions that he is unsure of his future and how fast the world is changing. This keeps him up at night, and he doesn't want to go out with friends anymore and gets nervous around crowds now due to feeling unsafe.")}
            >
              John James
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setPatientNote("Patient is a 26 year old female. She is very nervous and can't sleep, worrying about the future because she is unemployed but found out she is pregnant.")}
            >
              Sandra Johnson
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setPatientNote("The patient is a 78 year-old male who has high cholesterol, hypertension, and fatty liver from years of drinking alcohol. He has reports he is otherwise feeling in good health.")}
            >
              Mike Patel
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setPatientNote("Patient is a 62 year old female. She is sad, lonely, and feels without hope.  She has recently broken her hip and the recover is taking longer than expected. She has diabetes that is well-controlled. She otherwise avoids going to the doctor whenver possible. She admits she is likely behind on her regular health maintenance checks.")}
            >
              Jennifer Garcia
            </button>
        </div>
  
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
              className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110 disabled:opacity-60"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing . . ." : "Go"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
  
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
          <h3 className="text-md font-semibold text-gray-700 mb-8">
            Your Patient's Screening Recommendations
          </h3>
  
          {recommendations.length > 0 ? (
            <>
              <p className="text-sm mb-4 text-gray-500">Recommendations derived from hospital's internal sources</p>
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-sky-100 rounded-lg p-4 mb-3 last:mb-0 text-lg text-gray-700">
                  <p className="text-lg text-blue-600 font-bold mb-4">{rec.test}:</p>
                  <p className="mb-2">{rec.justification}</p>
                  {/* {rec.pub_date} */}
                  <div className="flex justify-end mt-2">
                  <span className={`${rec.governing_body === 'USPSTF' || 'US Preventive Services Task Force' ? 'bg-sky-100 text-sky-800' : 'bg-sky-100 text-sky-800'} text-xs font-bold px-2 py-1 rounded-full`}>
                  US Preventive Services Task Force
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
            </>
          )}
          {additional_recommendations.length > 0 ? (
            <>
              <p className="text-sm mb-4 text-gray-500">Additional recommendations derived from external sources</p>
            {additional_recommendations.map((rec, index) => (
              <div key={index} className="border border-sky-100 rounded-lg p-4 mb-3 last:mb-0 text-lg text-gray-700">
                <p className="text-lg text-blue-600 font-bold mb-4">{rec.test}:</p>
                <p className="mb-2">{rec.justification}</p>
                {/* {rec.pub_date} */}
                <div className="flex justify-end mt-2">
                <span className={`${rec.governing_body === 'USPSTF' || 'US Preventive Services Task Force' ? 'bg-sky-100 text-sky-800' : 'bg-sky-100 text-sky-800'} text-xs font-bold px-2 py-1 rounded-full`}>
                US Preventive Services Task Force
                  </span>
                </div>
              </div>
            ))}
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    );
}