import { Rule } from "./types/rule";

declare const self: ServiceWorkerGlobalScope;

const rules: Rule[] = [];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  const { type, payload } = event.data;
  switch (type) {
    case "ADD_MOCKER_RULE":
      rules.push(payload);
      break;
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  const matchedRule = rules.find((rule) => {
    const ruleMatches = url.pathname === rule.url;
    const methodMatches = !rule.method || rule.method === request.method;
    return ruleMatches && methodMatches;
  });

  if (!matchedRule) {
    return;
  }

  if (matchedRule.redirectTo) {
    const redirectUrl = new URL(
      matchedRule.redirectTo,
      url.origin
    ).toString();
    event.respondWith(Response.redirect(redirectUrl, 302));
  }
});
