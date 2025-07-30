// import Image from "next/image";
import { useState } from "react";
import {getSDOH, SDOHResponse } from "../services/api";
import {note_1_medicine_CHF, psychiatric_note, er_report, depression_note, soap_note_cancer} from "./notes_samples";

export default function SDOH() {
    const [clinicalNote, setClinicalNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sdoh, setSDOH] = useState<SDOHResponse['sdoh'] | null >(null);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        let requestPayload = {"note": clinicalNote};
        let response = await getSDOH(requestPayload);
        console.log("Risk factors & interventions:", response);
        setSDOH(response.sdoh || null)
      } catch (err) {
        console.error("Error:", err);
        setError("Sorry, failed to analyze sdoh.");
      } finally {
        setIsLoading(false);
      }
    };

  

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-teal-100 to-teal-275 flex flex-col items-center justify-top mt-36 px-36 py-36 text-3xl rounded-lg">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-1">
          SDOH RISK FACTORS
        </h1>
        <h2 className="text-3xl font-medium text-center text-gray-600 mb-10">
          Agentic Decision Support System
        </h2>
        <div className="instructions text-lg text-gray-700 italic mb-6">
          <ol>
            <li>To get started, type in a patient&apos;s clinical note and press go.</li>
            <li>You can also choose from some sample deidentified notes.</li>
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
            className="border border-sky-100 p-4 rounded-lg text-gray-800 text-lg w-full h-96 focus:outline-none focus:ring-2 focus:ring-sky-200 mb-2"
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
              {isLoading ? <span className="animate-pulse">Processing . . .</span> : "Go"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
  
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
          <h3 className="text-md font-semibold text-gray-700 mb-8">
            Patient&apos;s SDOH Risk Factors & Interventions
          </h3>
          <div className="text-base font-normal border border-sky-100 p-4 rounded-lg">
            {sdoh ? (
              <ul>
              <li>{sdoh['housing_instability']?.present ? (<span className="font-bold text-red-500">Housing Instability: </span>) : (<span className="text-black-500">Housing Instability: </span>)}
                {sdoh['housing_instability']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['housing_instability']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['housing_instability'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['housing_instability'].interventions[0]}</div>
                  </>
                )}
              </li>

              <li>{sdoh['financial_hardship']?.present ? (<span className="font-bold text-red-500">Financial Hardship: </span>) : (<span className="text-black-500">Financial Hardship: </span>)}
                {sdoh['financial_hardship']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['financial_hardship']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['financial_hardship'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['financial_hardship'].interventions[0]}</div>
                  </>
                )}
              </li>
              
              <li>{sdoh['domestic_violence']?.present ? (<span className="font-bold text-red-500">Domestic Violence: </span>) : (<span className="text-black-500">Domestic Violence: </span>)}
                {sdoh['domestic_violence']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['domestic_violence']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['domestic_violence'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['domestic_violence'].interventions[0]}</div>
                  </>
                )}
              </li>
 
              <li>{sdoh['food_insecurity']?.present ? (<span className="font-bold text-red-500">Food Insecurity: </span>) : (<span className="text-black-500">Food Insecurity: </span>)}
                {sdoh['food_insecurity']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['food_insecurity']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['food_insecurity'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['food_insecurity'].interventions[0]}</div>
                  </>
                )}
              </li>

              <li>{sdoh['lack_of_transportation']?.present ? (<span className="font-bold text-red-500">Lack of Transportation: </span>) : (<span className="text-black-500">Lack of Transportation: </span>)}
                {sdoh['lack_of_transportation']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['lack_of_transportation']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['lack_of_transportation'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['lack_of_transportation'].interventions[0]}</div>
                  </>
                )}
              </li>              

              <li>{sdoh['language_barriers']?.present ? (<span className="font-bold text-red-500">Language Barriers: </span>) : (<span className="text-black-500">Language Barriers: </span>)}
                {sdoh['language_barriers']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['language_barriers']?.present &&(<>
                  <div className="pl-16 italic text-md text-red-600">Reasoning: {sdoh['language_barriers'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['language_barriers'].interventions[0]}</div>
                  </>
                )}
              </li> 

              <li>{sdoh['low_health_literacy']?.present ? (<span className="font-bold text-red-500">Low Health Literacy: </span>) : (<span className="text-black-500">Low Health Literacy: </span>)}
                {sdoh['low_health_literacy']?.present ? <span className="text-red-500 font-bold"> Yes</span> : ' No'}
                {sdoh['low_health_literacy']?.present &&(<>
                  <div className="pl-16 italic text-base text-red-600">Reasoning: {sdoh['low_health_literacy'].reasoning}</div>
                  <div className="pl-16 italic text-md text-red-600">Intervention:{sdoh['low_health_literacy'].interventions[0]}</div>
                  </>
                )}
              </li>

              </ul>
            )
            : (
              // <p className="text-sm text-center text-gray-500"> Please enter a clinical note </p>
              <></>
            )
          }
          </div>
        </div>
            
          

          
        
      </div>
    );
}