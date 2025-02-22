// lib/db/data/routes-data.ts

export const routesData = {
  // 공개 경로
  public: {
    static: ["/", "/blog", "/search", "/login", "/register", "/about"],
    dynamic: ["/blogpost/[slug]"],
  },
  protected: {
    static: ["/dashboard", "/profile", "/admin"],
    dynamic: ["/dashboard/settings", "/profile/[id]", "/admin/[id]"],
  },
};

export const publicPaths = new Set([...routesData.public.static, ...routesData.public.dynamic]);
export const protectedPaths = new Set([...routesData.protected.static, ...routesData.protected.dynamic]);
