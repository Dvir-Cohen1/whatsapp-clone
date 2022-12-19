import { BadRequestError } from "../errors/Error";

export async function validateRequest(
  requestBody: Request,
  requestSchema: any,
  next: Function
) {
  const isValid = await requestSchema.isValid(requestBody);
  if (!isValid) next(new BadRequestError());
}
