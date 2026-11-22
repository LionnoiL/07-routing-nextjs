"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

interface AntdRegistryProps {
  children: React.ReactNode;
}

export default function AntdRegistry({ children }: AntdRegistryProps) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true, once: true });
    if (!styleText) return null;
    return (
      <style
        id="antd-cssinjs"
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
