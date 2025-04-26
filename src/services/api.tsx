// Define types for the API request and response
export interface GuidelineRequest {
  clinicalNote: string;
}

export interface Recommendation {
  text: string;
  grade: string;
}

export interface GuidelineResponse {
  recommendations: Recommendation[];
}

// Base URL for the API
const API_URL = 'http://localhost:8000';

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