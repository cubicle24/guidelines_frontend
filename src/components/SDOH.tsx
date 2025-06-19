// import Image from "next/image";
import { useState } from "react";
import {getSDOH, SDOHResponse } from "../services/api";
import {note_1_medicine_CHF, psychiatric_note, er_report, depression_note, soap_note_cancer} from "./notes_samples";

export default function SDOH() {
    const [clinicalNote, setClinicalNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sdoh, setSDOH] = useState<SDOHResponse['sdoh_data']>(null);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        let requestPayload = {"clinicalNote": clinicalNote};
        let data = await getSDOH(requestPayload);
        console.log("Risk factors & interventions:", data.sdoh_data);
        setSDOH(data.sdoh_data || null)
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to analyze sdoh.");
      } finally {
        setIsLoading(false);
      }
    };

  

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-200 to-purple-375 flex flex-col items-center justify-top mt-36 px-36 py-36 text-3xl">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-1">
          SDOH RISK FACTORS
        </h1>
        <h2 className="text-3xl font-medium text-center text-gray-600 mb-10">
          Agentic Decision Support System
        </h2>
        <div className="instructions text-lg text-gray-700 italic mb-6">
          <ol>
            <li>To get started, type in a patient&apos;s clinical note and press go.</li>
            <li>You can also choose from some pre-written notes.</li>
          </ol>
        </div>

        <div className="prepopulated-patients mb-8">
            <button
              className="bg-green-400 hover:bg-green-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setClinicalNote(note_1_medicine_CHF)}
            >
              Vanessa Takahashi
            </button>

            <button
              className="bg-green-400 hover:bg-green-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setClinicalNote(psychiatric_note)}
            >
              Cindy James
            </button>

            <button
              className="bg-green-400 hover:bg-green-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setClinicalNote(er_report)}
            >
              Oliver Guzman
            </button>

            <button
              className="bg-green-400 hover:bg-green-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setClinicalNote(depression_note)}
            >
              Mark Jones
            </button>

            <button
              className="bg-green-400 hover:bg-green-600 text-base text-white py-2 px-6 mx-2 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110"
              onClick={() => setClinicalNote(soap_note_cancer)}
            >
              Liana O'Connor
            </button>
        </div>
  
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Patient Note</h3>
          <textarea
            className="border border-sky-100 p-4 rounded-lg text-gray-800 text-lg w-full h-64 focus:outline-none focus:ring-2 focus:ring-sky-200 mb-2"
            placeholder="Enter patient note here..."
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition ease-in-out duration-300 shadow-lg hover:scale-110 disabled:opacity-60"
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
            Patient&apos;s SDOH Risk Factors + Suggested Interventions
          </h3>
  
          
        </div>
      </div>
    );
}