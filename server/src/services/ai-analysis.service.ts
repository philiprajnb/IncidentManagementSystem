import ai from "../ai/gemini.client";
import { AIAnalysisDto } from "../dto/ai-analysis.dto";
import { IIncident } from "../models/incident";

class AIAnalysisService {
  async analyzeIncident(
    incident: IIncident
  ): Promise<AIAnalysisDto> {

    const prompt = `
You are a Senior Site Reliability Engineer (SRE)

working in a large cloud infrastructure team.

Your job is to help incident responders.

Title:
${incident.title}

Description:
${incident.description}

Current Severity:
${incident.severity}

Current Status:
${incident.status}

1. A concise executive summary.

2. Recommend an appropriate severity.

3. Explain WHY that severity is appropriate.

4. Suggest the most likely technical root causes.

5. Confidence score between 0 and 100.

Return ONLY valid JSON in the following format:

{
  "summary": "",
  "recommendedSeverity": "LOW | MEDIUM | HIGH | CRITICAL",
  "reason": "",
  "possibleRootCauses": [],
  "confidence": 0
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const cleanJson = text

  .replace(/```json/g, "")

  .replace(/```/g, "")

  .trim();

return JSON.parse(cleanJson) as AIAnalysisDto;
  }
}

export default new AIAnalysisService();