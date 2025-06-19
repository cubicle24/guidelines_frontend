// Define types for the API request and response
export interface GuidelineRequest {
  clinicalNote: string;
}

export interface Recommendation {
  test: string;
  justification: string;
  next_due_date: string;
  evidence: string;
  governing_body: string;
  topic: string;
  pub_date: string;
}

export interface GuidelineResponse {
  recommendations: {
    recommendations: Recommendation[];
    additional_recommendations: Recommendation[];
  };
}

export interface SDOHResponse {
  sdoh_data: {
    sdoh: {[key: string]: SDOHRiskFactor};
    audit_trail: string[];
  } | null;
}

export interface SDOHRiskFactor {
  present: boolean;
  reasoning: string;
  z_code: string[];
  interventions: string[];
}

// Base URL for the API
// const API_URL = 'http://localhost:8000';
const API_URL = 'http://154.53.56.13:8000';

/**
 * Fetches screening recommendations based on patient notes
 * @param patientNote - The clinical note about the patient
 * @returns Promise with the recommendations response
 */
export const getRecommendations = async (body: {clinicalNote: string}): Promise<GuidelineResponse> => {
  try {
    const response = await fetch(`${API_URL}/guidelines/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};


/**
 * Fetches SDOH risk factors and intervention based on a patient note
 * @param clinicalNote - The clinical note about the patient
 * @returns Promise with the SDOH data package returned
 */
export const getSDOH = async (body: {clinicalNote: string}): Promise<SDOHResponse> => {
  try {
    const response = await fetch(`${API_URL}/sdoh/run_agent_sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`SDOH API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching SDOH response:', error);
    throw error;
  }
};