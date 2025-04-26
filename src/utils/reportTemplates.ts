export interface ReportTemplate {
  deformityType: string;
  symptoms: string[];
  tumorType: string;
  severity: string;
  recommendations: string[];
}

export const reportTemplates: Record<string, ReportTemplate> = {
  frontal_lobe: {
    deformityType: "Glioblastoma",
    symptoms: ["Headaches", "Personality changes", "Memory problems", "Seizures"],
    tumorType: "Malignant (Grade IV)",
    severity: "High",
    recommendations: ["Immediate surgical consultation", "MRI with contrast", "Neuropsychological assessment"]
  },
  temporal_lobe: {
    deformityType: "Meningioma",
    symptoms: ["Hearing problems", "Language difficulties", "Memory impairment", "Seizures"],
    tumorType: "Benign (Grade I)",
    severity: "Moderate",
    recommendations: ["Surgical resection", "Regular monitoring", "Anti-seizure medication"]
  },
  parietal_lobe: {
    deformityType: "Astrocytoma",
    symptoms: ["Spatial disorientation", "Numbness", "Visual field defects", "Language disorders"],
    tumorType: "Malignant (Grade III)",
    severity: "High",
    recommendations: ["Combined radiation and chemotherapy", "Surgical resection", "Neurological rehabilitation"]
  },
  occipital_lobe: {
    deformityType: "Oligodendroglioma",
    symptoms: ["Visual disturbances", "Headaches", "Seizures", "Balance issues"],
    tumorType: "Malignant (Grade II)",
    severity: "Moderate",
    recommendations: ["Surgical biopsy", "Chemotherapy evaluation", "Vision therapy"]
  },
  cerebellum: {
    deformityType: "Medulloblastoma",
    symptoms: ["Balance problems", "Coordination difficulties", "Headaches", "Nausea"],
    tumorType: "Malignant (pediatric)",
    severity: "High",
    recommendations: ["Immediate neurosurgical intervention", "Spinal tap", "Radiation therapy"]
  },
  brain_stem: {
    deformityType: "Diffuse Pontine Glioma",
    symptoms: ["Double vision", "Facial weakness", "Balance issues", "Swallowing difficulties"],
    tumorType: "Malignant (infiltrative)",
    severity: "Very high",
    recommendations: ["Radiation therapy", "Clinical trial consideration", "Supportive care"]
  },
  hypothalamus: {
    deformityType: "Craniopharyngioma",
    symptoms: ["Hormonal imbalances", "Visual problems", "Headaches", "Growth disorders"],
    tumorType: "Benign but invasive",
    severity: "Moderate",
    recommendations: ["Endocrine evaluation", "Surgical resection", "Hormone replacement therapy"]
  },
  amygdala: {
    deformityType: "Low-grade Glioma",
    symptoms: ["Emotional changes", "Memory problems", "Seizures", "Anxiety"],
    tumorType: "Low-grade (Grade II)",
    severity: "Low to moderate",
    recommendations: ["Watchful waiting", "Anti-seizure medication", "Regular MRI monitoring"]
  },
  hippocampus: {
    deformityType: "Ganglioglioma",
    symptoms: ["Memory loss", "Temporal lobe seizures", "Cognitive impairment", "Déjà vu episodes"],
    tumorType: "Mixed neuronal-glial (Grade I-II)",
    severity: "Low to moderate",
    recommendations: ["Surgical resection if symptomatic", "Seizure management", "Cognitive rehabilitation"]
  },
  thalamus: {
    deformityType: "Thalamic Glioma",
    symptoms: ["Sensory impairment", "Motor weakness", "Speech problems", "Vision changes"],
    tumorType: "Diffuse (Grade II-IV)",
    severity: "High",
    recommendations: ["Stereotactic biopsy", "Radiation therapy", "Palliative care consultation"]
  },
  default: {
    deformityType: "Unspecified brain mass",
    symptoms: ["Headaches", "Neurological deficits", "Seizures", "Cognitive changes"],
    tumorType: "Pending histopathological analysis",
    severity: "Undetermined",
    recommendations: ["Complete neurological workup", "Neurosurgical consultation", "Advanced imaging"]
  }
};
