export function getActionSuccess(action: string) {
  return `${action}_SUCCESS`;
}
export function getActionFailed(action: string) {
  return `${action}_FAILED`;
}
export function clearError(action: string) {
  return `${action}_CLEAR_ERROR`;
}
