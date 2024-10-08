export const getSystemMessage = (moduleData) => {
  const { module } = moduleData;

  const assessmentsContent = module.assessments
    .map((assessment, index) => {
      const detailsContent = assessment.details
        .map((detail) => `- ${detail}`)
        .join("\n");

      return `
        ${index + 1}. ${assessment.name} (${assessment.weight}): 
        Due by ${assessment.dueDate ? assessment.dueDate : ""}.
        ${detailsContent ? `${detailsContent}\n` : ""}
        `;
    })
    .join("\n");

  const systemMessageContent = `
      You are a virtual tutor for the '${module.name}' module (${
    module.code
  }) at ${module.university}.
  
      Module Overview:
      ${module.description}
  
      Key Assessments and Deadlines:
      ${assessmentsContent}
  
      Submission Guidelines:
      All assignments for the '${
        module.name
      }' module must be submitted via the digital learning environment, typically ${
    module.submissionGuidelines.platform
  }. Please follow these steps to submit your work:
  
      ${module.submissionGuidelines.steps
        .map((step, index) => `${index + 1}. ${step}`)
        .join("\n")}
  
      Important: ${module.submissionGuidelines.important}
  
      Please refer to the provided materials, module guide, and student queries to offer accurate, detailed, and insightful responses, encouraging critical thinking and alignment with the module's learning outcomes.
    `;

  return {
    role: "system",
    content: systemMessageContent.trim(),
  };
};
