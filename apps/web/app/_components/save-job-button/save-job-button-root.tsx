import { LONG_JWT_TEMPLATE } from "@/_lib/constants";
import { auth } from "@clerk/nextjs/server";
import { type ComponentProps, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import SaveJobButton from "./save-job-button";

const SaveJobButtonAuth = async (
  props: Omit<ComponentProps<typeof SaveJobButton>, "token">,
) => {
  const { getToken } = await auth();

  const token = await getToken({
    template: LONG_JWT_TEMPLATE,
  });

  return <SaveJobButton token={token} {...props} />;
};

const SaveJobButtonRoot = (props: ComponentProps<typeof SaveJobButtonAuth>) => {
  return (
    <Suspense fallback={<Skeleton className="size-9 rounded-md shadow-md" />}>
      <SaveJobButtonAuth {...props} />
    </Suspense>
  );
};

export default SaveJobButtonRoot;
