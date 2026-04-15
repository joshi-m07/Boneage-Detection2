export type PredictionSide = {
  age: number;
  uncertainty_sigma: number;
  gradcam_url: string;
};

export type PredictionResponse = {
  status: string;
  patient_id: string;
  prediction_id: number;
  mlflow_run_id: string;
  male_prediction?: PredictionSide;
  female_prediction?: PredictionSide;
  timestamp: string;
  message: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user_name: string;
  user_email: string;
};
