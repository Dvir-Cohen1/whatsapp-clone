import { BadRequestError } from "../errors/Error";

export async function validateRequest(
  requestSchema: any,
  requestBody: any,
  next: Function
) {
  const isValid = await requestSchema.isValid(requestBody);
  if (!isValid)
    return next(new BadRequestError("Bad requset"));
}
