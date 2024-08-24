import React, { ComponentProps, type FC } from "react";

import { Link } from "react-router-dom";

import { cn } from "@/shared/utils";

import { FaGoogle, FaYandex } from "react-icons/fa";

const SsoLinks: FC<ComponentProps<"div">> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-3 items-center justify-center w-full",
        className,
      )}
    >
      <p className="text-center basis-full text-sm font-thin">
        Войти с помощью:
      </p>
      <div className="flex flex-wrap gap-x-2.5 items-center justify-center w-full">
        <Link to="/">
          <FaGoogle className="size-6" />
        </Link>
        <Link to="/">
          <FaYandex className="size-6" />
        </Link>
      </div>
    </div>
  );
};

export default SsoLinks;
