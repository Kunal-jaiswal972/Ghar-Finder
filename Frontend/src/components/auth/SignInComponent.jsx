import { SignIn } from "@clerk/clerk-react";
 

const SignInComponent = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <SignIn routing="path" path="/sign-in" afterSignInUrl="/" />
    </div>
  );
};

export default SignInComponent;

