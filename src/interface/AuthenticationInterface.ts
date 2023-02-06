export default interface AuthenticationInterface {
  authenticated: boolean;
  handleBiometricAuth: () => Promise<boolean | void>;
}