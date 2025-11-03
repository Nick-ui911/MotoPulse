import { Suspense } from "react";
import ResetPasswordPage from "../components/ResetPassword";
import Spinner from "../components/Spinner";

// i do this because this useSearchParams() is not working in build stage of production;

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
