import { auth } from "@clerk/nextjs/server";
import { type ComponentProps, Suspense } from "react";
import SaveJobButton from "./save-job-button";

const SaveJobButtonAuth = async (
  props: Omit<ComponentProps<typeof SaveJobButton>, "token">,
) => {
  const { getToken } = await auth();

  const token = await getToken();

  return <SaveJobButton token={token} {...props} />;
};

const SaveJobButtonRoot = (props: ComponentProps<typeof SaveJobButtonAuth>) => {
  return (
    <Suspense>
      <SaveJobButtonAuth {...props} />
    </Suspense>
  );
};

export default SaveJobButtonRoot;
