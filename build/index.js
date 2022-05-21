var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
var import_styled_components = require("styled-components");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const sheet = new import_styled_components.ServerStyleSheet();
  let markup = (0, import_server.renderToString)(sheet.collectStyles(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  })));
  const styles2 = sheet.getStyleTags();
  markup = markup.replace("__STYLES__", styles2);
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/root.tsx
var root_exports = {};
__export(root_exports, {
  UnstyledLink: () => UnstyledLink,
  WidthRestrictor: () => WidthRestrictor,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node");
var import_react8 = require("@remix-run/react");
var import_react9 = __toESM(require("react"));
var import_react10 = require("react");
var import_styled_components4 = __toESM(require("styled-components"));

// app/components/app-header.tsx
var import_react5 = require("@remix-run/react");
var import_react6 = __toESM(require("react"));
var import_styled_components2 = __toESM(require("styled-components"));

// app/constants/styles.ts
var styles = {
  colors: {
    primary: "#2E294E",
    primary_background: "#F2F2F8",
    action: "#ACC196",
    action_light: "#D7E1CC",
    white: "#FFFFFF",
    busy: "#D7263D",
    warn: "#EEB868",
    black: "#000000",
    free: "#74D06C",
    gray: {
      5: "#F7F7F7",
      10: "#F1F1F1",
      20: "#E1E1E1",
      30: "#D1D1D1",
      40: "#C1C1C1",
      50: "#B1B1B1",
      60: "#A1A1A1",
      70: "#919191",
      80: "#818181",
      90: "#717171",
      100: "#616161",
      110: "#515151",
      120: "#414141",
      130: "#313131",
      140: "#212121",
      150: "#111111"
    }
  },
  shadows: [
    "0 4px 8px 0 rgb(0 0 0 / 8%)",
    "0px 1px 4px rgba(0, 0, 0, 0.25)",
    "0px 1px 1px rgba(0, 0, 0, 0.25)"
  ]
};

// app/contexts/langsContext.tsx
var import_react2 = __toESM(require("react"));
var langsContext = import_react2.default.createContext(null);
var useLangs = () => {
  const value = (0, import_react2.useContext)(langsContext);
  if (!value)
    throw new Error("Ilegal use of context");
  return value;
};

// app/contexts/whereAreWeContext.tsx
var import_react3 = __toESM(require("react"));
var signingInContext = import_react3.default.createContext(null);
var useWhereAreWe = () => {
  const value = (0, import_react3.useContext)(signingInContext);
  if (!value)
    throw new Error("Ilegal use of context");
  return value;
};

// app/contexts/usernameContext.tsx
var import_react4 = __toESM(require("react"));
var usernameContext = import_react4.default.createContext(null);
var useUsername = () => {
  const value = (0, import_react4.useContext)(usernameContext);
  if (!value)
    throw new Error("Ilegal use of context");
  return value;
};

// app/assets/langs/cs.texts.json
var cs_texts_exports = {};
__export(cs_texts_exports, {
  availability: () => availability,
  default: () => cs_texts_default,
  loadingText: () => loadingText,
  months: () => months,
  name: () => name,
  searchPlaceholder: () => searchPlaceholder
});
var name = "cs";
var availability = {
  mostlyFree: "Pom\u011Brn\u011B pr\xE1zdno",
  fairlyBusy: "Pom\u011Brn\u011B plno"
};
var searchPlaceholder = "Hledat podle jm\xE9na";
var loadingText = [
  "Na\u010D\xEDt\xE1n\xED",
  "Skoro tam",
  "Zpracov\xE1v\xE1n\xED",
  "D\u011Bl\xE1me na tom",
  "Vte\u0159inu",
  "P\u0159esouv\xE1me"
];
var months = [
  "Leden",
  "\xDAnor",
  "B\u0159ezen",
  "Duben",
  "Kv\u011Bten",
  "\u010Cerven",
  "\u010Cervenec",
  "Srpen",
  "Z\xE1\u0159\xED",
  "\u0158\xEDjen",
  "Listopad",
  "Prosinec"
];
var cs_texts_default = {
  name,
  availability,
  searchPlaceholder,
  loadingText,
  months
};

// app/assets/langs/en.texts.json
var en_texts_exports = {};
__export(en_texts_exports, {
  availability: () => availability2,
  default: () => en_texts_default,
  loadingText: () => loadingText2,
  months: () => months2,
  name: () => name2,
  searchPlaceholder: () => searchPlaceholder2
});
var name2 = "en";
var availability2 = {
  mostlyFree: "Mostly free",
  fairlyBusy: "Fairly busy"
};
var searchPlaceholder2 = "Search by name";
var loadingText2 = [
  "Loading",
  "Almost there",
  "Crunching",
  "Working",
  "Just a second",
  "Transporting"
];
var months2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var en_texts_default = {
  name: name2,
  availability: availability2,
  searchPlaceholder: searchPlaceholder2,
  loadingText: loadingText2,
  months: months2
};

// app/assets/icons/gb.tsx
var GbIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 640 480",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  fill: "#012169",
  d: "M0 0h640v480H0z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#FFF",
  d: "m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#C8102E",
  d: "m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#FFF",
  d: "M241 0v480h160V0H241zM0 160v160h640V160H0z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#C8102E",
  d: "M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
}));
var gb_default = GbIcon;

// app/assets/icons/cz.tsx
var CzIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 640 480",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  fill: "#fff",
  d: "M0 0h640v240H0z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#d7141a",
  d: "M0 240h640v240H0z"
}), /* @__PURE__ */ React.createElement("path", {
  fill: "#11457e",
  d: "M360 240 0 0v480z"
}));
var cz_default = CzIcon;

// app/components/app-header.tsx
var import_fa = require("react-icons/fa");
var Wrap = import_styled_components2.default.header`
  background-color: ${styles.colors.primary};
  transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.2s ease-out;
  top: 0px;
  position: sticky;
  width: 100%;
  box-sizing: border-box;
  gap: 2rem;
  padding: 1.3rem 0.2rem 1.3rem 1rem;
  z-index: 4;
`;
var InnerWrap = import_styled_components2.default.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
  max-width: 938px;
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 4rem;
  }
`;
var Title = import_styled_components2.default.h6`
  color: ${styles.colors.primary};
  padding: 0.5rem;
  border-radius: 0.4rem;
  font-size: 1.375rem;
  font-weight: bold;
  margin: 0px;
  background-color: ${styles.colors.white};
  transition: background-color 0.15s;
  &:hover {
    background-color: ${styles.colors.gray[20]};
  }
  &:active {
    background-color: ${styles.colors.gray[40]};
  }
`;
var MenuItem = import_styled_components2.default.p`
  margin: 0px;
  font-size: 0.875rem;
  color: ${styles.colors.white};
  box-sizing: border-box;
  border: ${(props) => props.border ? `1px solid ${styles.colors.white}` : ""};
  background-color: transparent;
  transition: background-color 0.15s;
  padding: 0.5rem 0.8rem;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.4rem;
  &:hover {
    background-color: ${styles.colors.white}30;
  }
  &:active {
    background-color: ${styles.colors.white}30;
  }
`;
var WrappedMenuItem = import_styled_components2.default.p`
  margin: 0px;
  font-size: 0.875rem;
  color: ${styles.colors.white};
  box-sizing: border-box;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
`;
var ProfileImage = import_styled_components2.default.span`
  height: 2rem;
  width: 2rem;
  font-size: 1rem;
  color: ${styles.colors.primary};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${styles.colors.white};
`;
var Side = import_styled_components2.default.div`
  display: flex;
  align-items: stretch;
`;
var BarLink = (0, import_styled_components2.default)(import_react5.Link)`
  display: ${(props) => props.hide === true ? "none" : "flex"};
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${styles.colors.white};
  text-decoration: none;
  padding: 0 0.4rem;
`;
var StretchForm = import_styled_components2.default.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;
var BarButton = import_styled_components2.default.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  margin: 0px;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  padding: 0 1.5rem;
  color: ${styles.colors.white};
  border: none;
`;
var HoverBarButton = (0, import_styled_components2.default)(BarButton)`
  border-radius: 0.4rem;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: ${styles.colors.gray[10]}20;
  }
`;
var Circle = import_styled_components2.default.div`
  border-radius: 100%;
  height: 1.875rem;
  width: 1.875rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${styles.colors.action};
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    transform: scale(1.1);
  }
`;
var In = import_styled_components2.default.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var MenuButton = (0, import_styled_components2.default)(BarButton)`
  @media (min-width: 800px) {
    display: none;
  }
`;
var RightSide = (0, import_styled_components2.default)(Side)`
  @media (max-width: 800px) {
    display: ${(props) => props.showMenu ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    grid-row: 2;
    grid-column: 1 / span 2;
  };
  
`;
var BarLinkMoreThan400 = (0, import_styled_components2.default)(BarLink)`
  @media (max-width: 400px) {
    display: none;
  }
`;
var BarLinkLessThan400 = (0, import_styled_components2.default)(BarLink)`
  @media (min-width: 400px) {
    display: none;
  }
`;
var Separator = import_styled_components2.default.div`
  @media (min-width: 800px) {
    display: none;
  }
  background-color: ${styles.colors.white}40;
  width: 80%;
  height: 0.0625rem;
`;
var Separator400 = (0, import_styled_components2.default)(Separator)`
  @media (min-width: 400px) {
    display: none;
  }
`;
var Backdrop = import_styled_components2.default.div`
  position: fixed;
  z-index: 3;
  display: ${(props) => props.hidden ? "none" : ""};
  background-color: ${styles.colors.black}60;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: scale(150%);
  width: 100vw;
  height: 100vh;
  align-items: center;
`;
function AppHeader({ children }) {
  const location = (0, import_react5.useLocation)();
  const [isLandingPage, setIsLandingPage] = (0, import_react6.useState)(false);
  const [showMenu, setShowMenu] = (0, import_react6.useState)(false);
  const { username, admin, usernameToVerify } = useUsername();
  const { setTranslations: setL, translations: l, lang, setLang } = useLangs();
  const { signingIn } = useWhereAreWe();
  (0, import_react6.useEffect)(() => {
    setIsLandingPage(location.pathname === "/");
  }, [location]);
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(Backdrop, {
    hidden: !showMenu
  }), /* @__PURE__ */ import_react6.default.createElement(Wrap, null, /* @__PURE__ */ import_react6.default.createElement(InnerWrap, null, /* @__PURE__ */ import_react6.default.createElement(Side, null, /* @__PURE__ */ import_react6.default.createElement(BarLink, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    },
    to: "/places"
  }, /* @__PURE__ */ import_react6.default.createElement(Title, null, children)), /* @__PURE__ */ import_react6.default.createElement(BarLinkMoreThan400, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    },
    to: isLandingPage ? "/places" : "/"
  }, /* @__PURE__ */ import_react6.default.createElement(MenuItem, null, isLandingPage ? "Places" : "Who are we?"))), /* @__PURE__ */ import_react6.default.createElement(MenuButton, {
    onClick: (e) => {
      console.log("x");
      e.preventDefault();
      setShowMenu(!showMenu);
    }
  }, /* @__PURE__ */ import_react6.default.createElement(import_fa.FaBars, null)), /* @__PURE__ */ import_react6.default.createElement(RightSide, {
    showMenu
  }, /* @__PURE__ */ import_react6.default.createElement(BarLinkLessThan400, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    },
    to: isLandingPage ? "/places" : "/"
  }, /* @__PURE__ */ import_react6.default.createElement(MenuItem, null, isLandingPage ? "Places" : "Who are we?")), /* @__PURE__ */ import_react6.default.createElement(Separator400, null), /* @__PURE__ */ import_react6.default.createElement(BarLink, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    },
    style: { marginRight: "0.6rem" },
    to: "/admin/reservations"
  }, /* @__PURE__ */ import_react6.default.createElement(MenuItem, {
    border: true
  }, "List a business")), /* @__PURE__ */ import_react6.default.createElement(Separator, null), /* @__PURE__ */ import_react6.default.createElement(BarButton, {
    onClick: () => {
      setL(lang == "czech" ? en_texts_exports : cs_texts_exports);
      setLang(lang == "czech" ? "english" : "czech");
    }
  }, l.name == "cs" ? /* @__PURE__ */ import_react6.default.createElement(Circle, null, /* @__PURE__ */ import_react6.default.createElement(In, null, /* @__PURE__ */ import_react6.default.createElement(cz_default, {
    height: "2.5rem"
  }))) : /* @__PURE__ */ import_react6.default.createElement(Circle, null, /* @__PURE__ */ import_react6.default.createElement(In, null, /* @__PURE__ */ import_react6.default.createElement(gb_default, {
    height: "2.5rem"
  })))), /* @__PURE__ */ import_react6.default.createElement(Separator, null), /* @__PURE__ */ import_react6.default.createElement(BarLink, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    },
    hide: signingIn ?? false,
    to: "/profile",
    style: { fontWeight: "bold" }
  }, /* @__PURE__ */ import_react6.default.createElement(MenuItem, null, usernameToVerify ? "Verify your email" : username ?? "Sign In", /* @__PURE__ */ import_react6.default.createElement(ProfileImage, null, username ? username[0] : ""))), !signingIn && /* @__PURE__ */ import_react6.default.createElement(Separator, null), /* @__PURE__ */ import_react6.default.createElement(StretchForm, {
    action: "/logout",
    method: "post"
  }, /* @__PURE__ */ import_react6.default.createElement("input", {
    type: "text",
    name: "redirectUrl",
    hidden: true,
    defaultValue: "/authenticate"
  }), (username || usernameToVerify) && /* @__PURE__ */ import_react6.default.createElement(HoverBarButton, {
    onClick: (e) => {
      console.log("x");
      setShowMenu(false);
    }
  }, "Logout"))))));
}

// app/components/Loader.tsx
var import_react7 = __toESM(require("react"));
var import_styled_components3 = __toESM(require("styled-components"));
var Wrap2 = import_styled_components3.default.div`
  position: fixed;
  transition: opacity 0.1s ease-out, transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  opacity: ${(props) => props.show ? "1" : "0"};
  transform: translateY(${(props) => props.show ? "0" : "4.5"}rem);
  bottom: 2.5rem;
  background-color: ${styles.colors.primary};
  right: 2.5rem;
  border-radius: 0.6rem;
  box-shadow: ${styles.shadows[0]};
  display: flex;
  justify-content: center;
  padding: 1rem 1.5rem;
  gap: 1.5rem;
  @media (max-width: 500px) {
    right: 50%;
    width: 100%;
    max-width: 400px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    /* transform: translateY(${(props) => props.show ? "0" : "4.5"}rem); */
    transform: translate(50%, ${(props) => props.show ? "2.5" : "4.5"}rem);
  }
`;
var Text = import_styled_components3.default.p`
  color: ${styles.colors.white};
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0px;
`;
var spin = import_styled_components3.keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(720deg); }
`;
var Symbol = import_styled_components3.default.div`
  height: 0.9rem;
  width: 0.9rem;
  background-color: ${styles.colors.action};
  border-radius: 0.2rem;
  animation-name: ${spin};
  animation-duration: 1.2s;
  animation-delay: 0.9s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
var Loader = ({ show }) => {
  const ref = (0, import_react7.useRef)(null);
  const { translations: l } = useLangs();
  const [textIndex, setTextIndex] = import_react7.default.useState(0);
  import_react7.default.useEffect(() => {
    if (!show) {
      setTimeout(() => {
        if (ref.current)
          ref.current.style.visibility = "hidden";
      }, 200);
    } else {
      if (ref.current) {
        setTextIndex(Math.floor(Math.random() * 6));
        ref.current.style.visibility = "";
      }
    }
  }, [show]);
  return /* @__PURE__ */ import_react7.default.createElement(Wrap2, {
    show,
    ref
  }, /* @__PURE__ */ import_react7.default.createElement(Symbol, null), /* @__PURE__ */ import_react7.default.createElement(Text, null, l.loadingText[textIndex], "..."));
};

// app/utils/session.server.ts
var import_node = require("@remix-run/node");

// app/db.server.ts
var import_client_ses = require("@aws-sdk/client-ses");
var import_aws_sdk = __toESM(require("aws-sdk"));
var import_client = require("@prisma/client");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
var prisma;
var ses;
var s3;
import_aws_sdk.default.config.update({
  accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_EMAIL_SECRET_ACCESS_KEY
});
if (!process.env.AWS_EMAIL_ACCESS_KEY_ID || !process.env.AWS_EMAIL_SECRET_ACCESS_KEY) {
  throw Error("No email credentials");
}
if (false) {
  prisma = getClient();
  ses = new import_client_ses.SES({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_EMAIL_SECRET_ACCESS_KEY
    }
  });
  s3 = new import_aws_sdk.default.S3();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
    global.__ses__ = new import_client_ses.SES({
      region: "eu-west-2",
      credentials: {
        accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_EMAIL_SECRET_ACCESS_KEY
      }
    });
    global.__s3__ = s3 = new import_aws_sdk.default.S3();
  }
  prisma = global.__db__;
  ses = global.__ses__;
  s3 = global.__s3__;
}
function getClient() {
  const { DATABASE_URL } = process.env;
  (0, import_tiny_invariant.default)(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");
  const databaseUrl = new URL(DATABASE_URL);
  console.log(`\u{1F50C} setting up prisma client to ${databaseUrl.host}`);
  const client = new import_client.PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL
      }
    }
  });
  client.$connect();
  return client;
}

// app/models/user.server.ts
var getUserId = async ({ username }) => await prisma.user.findUnique({
  where: { username },
  select: {
    id: true
  }
});
var checkForUserByUsername = async ({ username }) => await prisma.user.findUnique({
  where: { username },
  select: { id: true, passwordHash: true, admin: true, verifiedEmail: true, email: true }
});
var getEmailFromUsername = async ({ username }) => await prisma.user.findUnique({
  where: { username },
  select: { email: true }
});
var checkForUserByEmail = async ({ email }) => await prisma.user.findUnique({
  where: { email },
  select: { id: true, passwordHash: true, admin: true }
});
var getUserEmailToResend = async ({ username }) => await prisma.user.findUnique({
  where: {
    username
  },
  select: { email: true, verifyEmailTriesLeft: true }
});
var addToSearchHistory = async ({ username, phrase, locationId, tagIds, categoryIds }) => await prisma.user.update({
  where: { username },
  data: {
    searchHistory: {
      create: {
        phrase,
        locationId,
        Tags: {
          connect: tagIds.map((t) => ({ id: t }))
        },
        Categories: {
          connect: categoryIds.map((c) => ({ id: c }))
        }
      }
    }
  }
});
var getSearchHistory = async ({ username }) => await prisma.user.findUnique({
  where: { username },
  include: {
    searchHistory: {
      orderBy: [{
        createdAt: "desc"
      }],
      take: 6,
      include: {
        location: {
          include: {
            multiLangCity: true,
            multiLangCountry: true
          }
        },
        Tags: {
          include: {
            multiLangDesc: true,
            multiLangName: true
          }
        },
        Categories: {
          include: {
            multiLangName: true
          }
        }
      }
    }
  }
});
var verifyUserEmail = async (email) => await prisma.user.update({
  where: {
    email
  },
  data: {
    verifiedEmail: true
  },
  select: {
    username: true,
    admin: true
  }
});
var changeUserPassword = async ({ username, passwordHash }) => await prisma.user.update({
  where: {
    username
  },
  data: {
    passwordHash
  }
});
var getUserByUsername = async ({ username }) => await prisma.user.findUnique({
  where: { username },
  include: {
    reservationGroups: {
      include: {
        reservations: {
          include: {
            reservable: {
              include: {
                place: true,
                ReservableType: {
                  include: {
                    multiLangName: true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
var createUser = async ({
  username,
  passwordHash,
  email,
  phone,
  firstName,
  lastName
}) => await prisma.user.create({
  data: { username, passwordHash, email, phone, firstName, lastName },
  select: { id: true, passwordHash: true }
});
var updateUser = async ({ id, firstName, lastName, phone }) => await prisma.user.update({
  where: {
    id
  },
  data: {
    firstName,
    lastName,
    phone
  }
});

// app/utils/pwd_helper.server.ts
var import_crypto = require("crypto");
var generateHashAndSalt = async (pwd) => {
  const salt = (0, import_crypto.randomBytes)(16).toString("hex");
  const hashedPwd = (0, import_crypto.scryptSync)(pwd, salt, 64).toString("hex");
  return `${salt}:${hashedPwd}`;
};
var checkPassword = async (pwd, hash) => {
  const [salt, key] = hash.split(":");
  console.log(salt);
  console.log(key);
  const hashedBuffer = (0, import_crypto.scryptSync)(pwd, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = (0, import_crypto.timingSafeEqual)(hashedBuffer, keyBuffer);
  return match;
};

// app/utils/session.server.ts
var login = async ({ username, password }) => {
  if (username == "")
    return null;
  const user = await checkForUserByUsername({ username });
  if (user == null)
    return null;
  const passwordMatch = await checkPassword(password, user.passwordHash);
  if (!passwordMatch)
    return null;
  return { userId: user.id, admin: user.admin, verifiedEmail: user.verifiedEmail, email: user.email };
};
var register = async ({ username, password, email, phone, firstName, lastName }) => {
  if (username == "" || password == "" || email == "" || phone == "" || firstName == "" || lastName == "")
    return null;
  if (await checkForUserByUsername({ username }) != null || await checkForUserByEmail({ email }))
    return null;
  const newUser = await createUser({ username, email, phone, firstName, lastName, passwordHash: await generateHashAndSalt(password) });
  return { userId: newUser.id, admin: false };
};
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("You have no session secret, idiot.");
}
var storage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "reserveroo-session",
    secure: false,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});
var createUserSession = async (username, admin = false, verifiedEmail = false, redirectTo) => {
  const session = await storage.getSession();
  if (!verifiedEmail) {
    session.set("usernameToVerify", username);
  } else {
    session.set("username", username);
    session.set("usernameToVerify", null);
    session.set("admin", admin);
  }
  return (0, import_node.redirect)(!verifiedEmail ? "/verifyEmail" : redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
};
var getUserSession = (request) => {
  return storage.getSession(request.headers.get("Cookie"));
};
var requireUsernameAndAdmin = async (request, redirectTo = new URL(request.url).pathname) => {
  const session = await getUserSession(request);
  const username = session.get("username");
  const admin = session.get("admin");
  const usernameToVerify = session.get("usernameToVerify");
  if (usernameToVerify) {
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo]
    ]);
    throw (0, import_node.redirect)(`/verifyEmail?${searchParams}`);
  }
  if (!username || admin === null || typeof username !== "string") {
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo]
    ]);
    throw (0, import_node.redirect)(`/authenticate?${searchParams}`);
  }
  return { username, admin: admin == "true" || admin == "1" };
};
var getUsernameAndAdmin = async (request) => {
  const session = await getUserSession(request);
  return { username: session.get("username"), admin: session.get("admin"), usernameToVerify: session.get("usernameToVerify") };
};
var requireUsernameToVerify = async (request) => {
  const session = await getUserSession(request);
  const usernameToVerify = session.get("usernameToVerify");
  if (!usernameToVerify) {
    throw (0, import_node.redirect)(`/authenticate`);
  }
  return { usernameToVerify };
};
var logout = async (request, redirectUrl) => {
  const session = await getUserSession(request);
  return (0, import_node.redirect)(redirectUrl, {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
};

// app/fonts/main.css
var main_default = "/build/_assets/main-H5UVVGYO.css";

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "Reserveroo",
  viewport: "width=device-width,initial-scale=1"
});
var UnstyledLink = (0, import_styled_components4.default)(import_react8.Link)`
  color: ${styles.colors.white};
  text-decoration: none;
`;
var Body = import_styled_components4.default.body`
  margin: 0px;
  padding: 0px;
  overflow-y: ${(props) => props.isLandingPage ? "hidden" : "scroll"};
  & > * {
    font-family: Inter, Source Sans Pro, Roboto, sans-serif;
  }
`;
var loader = async ({ request }) => {
  const { username, admin, usernameToVerify } = await getUsernameAndAdmin(request);
  const langs = request.headers.get("Accept-Language");
  console.log(langs);
  return (0, import_node2.json)({ username, admin, usernameToVerify, langs: (langs == null ? void 0 : langs.split(",")[0]) ?? "" });
};
var WidthRestrictor = import_styled_components4.default.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 550px) {
    padding: 0 1rem;
  }
  box-sizing: border-box;
  max-width: ${(props) => props.width ?? "968px"};
`;
var Footer = import_styled_components4.default.footer`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  margin: 5rem auto 0;
  text-align: center;
  background-color: ${styles.colors.primary_background};
  &>p {
    color: ${styles.colors.black};
    margin: 0.6rem;
    font-size: 0.8rem;
    text-decoration: none;
  }
`;
var Main = ({ isLandingPage, admin }) => {
  return /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null, /* @__PURE__ */ import_react9.default.createElement("div", {
    style: { minHeight: "calc(100vh - 11.2rem)" }
  }, /* @__PURE__ */ import_react9.default.createElement(AppHeader, null, "Reserveroo"), /* @__PURE__ */ import_react9.default.createElement(import_react8.Outlet, null)), !isLandingPage && /* @__PURE__ */ import_react9.default.createElement(Footer, null, admin ? /* @__PURE__ */ import_react9.default.createElement(import_react8.Link, {
    to: "/admin/reservations"
  }, "Admin") : /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null), /* @__PURE__ */ import_react9.default.createElement("p", null, "\xA9 Reserveroo, 2022")));
};
function links() {
  return [{ rel: "stylesheet", href: main_default }];
}
function App() {
  const loaderData = (0, import_react8.useLoaderData)();
  const location = (0, import_react8.useLocation)();
  const [username, setUsername] = (0, import_react10.useState)(loaderData.username);
  const [translations, setTranslations] = (0, import_react10.useState)(loaderData.langs.includes("cs") ? cs_texts_exports : en_texts_exports);
  const [lang, setLang] = (0, import_react10.useState)(loaderData.langs.includes("cs") ? "czech" : "english");
  const [usernameToVerify, setUsernameToVerify] = (0, import_react10.useState)(loaderData.usernameToVerify);
  const [admin, setAdmin] = (0, import_react10.useState)(loaderData.admin);
  const [loading, setLoading] = (0, import_react10.useState)(false);
  const [signingIn, setSigningIn] = (0, import_react10.useState)(false);
  const [landingPage, setLandingPage] = (0, import_react10.useState)(false);
  import_react9.default.useEffect(() => {
    setUsername(loaderData.username);
    setAdmin(loaderData.admin);
  }, [loaderData]);
  const t = (0, import_react8.useTransition)();
  import_react9.default.useEffect(() => {
    setLoading(t.state === "loading" || t.state === "submitting");
  }, [t]);
  return /* @__PURE__ */ import_react9.default.createElement("html", {
    lang: "en",
    className: "h-full"
  }, /* @__PURE__ */ import_react9.default.createElement("head", null, /* @__PURE__ */ import_react9.default.createElement(import_react8.Meta, null), /* @__PURE__ */ import_react9.default.createElement("link", {
    rel: "stylesheet",
    href: main_default
  }), typeof document === "undefined" ? "__STYLES__" : null), /* @__PURE__ */ import_react9.default.createElement(Body, {
    className: "h-full",
    isLandingPage: landingPage
  }, /* @__PURE__ */ import_react9.default.createElement(signingInContext.Provider, {
    value: { signingIn, setSigningIn, landingPage, setLandingPage }
  }, /* @__PURE__ */ import_react9.default.createElement(usernameContext.Provider, {
    value: { username, setUsername, admin, setAdmin, usernameToVerify, setUsernameToVerify }
  }, /* @__PURE__ */ import_react9.default.createElement(langsContext.Provider, {
    value: { translations, setTranslations, lang, setLang }
  }, /* @__PURE__ */ import_react9.default.createElement(Main, {
    isLandingPage: landingPage,
    admin: admin ?? false
  }), /* @__PURE__ */ import_react9.default.createElement(Loader, {
    show: loading ?? false
  })))), /* @__PURE__ */ import_react9.default.createElement(import_react8.ScrollRestoration, null), /* @__PURE__ */ import_react9.default.createElement(import_react8.Scripts, null), /* @__PURE__ */ import_react9.default.createElement(import_react8.LiveReload, null)));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/doneVerifyingEmail.tsx
var doneVerifyingEmail_exports = {};
__export(doneVerifyingEmail_exports, {
  action: () => action,
  default: () => ComponentName,
  loader: () => loader2
});
var import_react12 = require("@remix-run/react");
var import_server_runtime = require("@remix-run/server-runtime");
var import_react13 = __toESM(require("react"));

// app/components/inputs/ObjectInput.tsx
var import_react11 = __toESM(require("react"));
var IdInput = ({ name: name3, value, onChange }) => {
  return /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement("input", {
    name: name3,
    type: "text",
    readOnly: true,
    value,
    hidden: true,
    onChange
  }));
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/doneVerifyingEmail.tsx
var loader2 = async ({ request }) => {
  const usernameToVerify = await requireUsernameToVerify(request);
  return (0, import_server_runtime.json)({ usernameToVerify });
};
var action = async ({ request }) => {
  return (0, import_server_runtime.redirect)("/");
};
function ComponentName() {
  const submit = (0, import_react12.useSubmit)();
  const formRef = import_react13.default.useRef(null);
  import_react13.default.useEffect(() => {
    if (formRef.current) {
      submit(formRef.current);
    }
  }, [formRef.current]);
  return /* @__PURE__ */ import_react13.default.createElement("div", null, /* @__PURE__ */ import_react13.default.createElement("p", null, "Signing you in..."), /* @__PURE__ */ import_react13.default.createElement(import_react12.Form, {
    method: "post"
  }, /* @__PURE__ */ import_react13.default.createElement(IdInput, {
    name: "nothing",
    value: ""
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/authenticate.tsx
var authenticate_exports = {};
__export(authenticate_exports, {
  ActiveHighlighter: () => ActiveHighlighter,
  AuthTabButton: () => AuthTabButton,
  Separator: () => Separator2,
  TabBar: () => TabBar,
  Title: () => Title4,
  default: () => Authenticate,
  loader: () => loader3
});
var import_react31 = require("@remix-run/react");
var import_react32 = __toESM(require("react"));
var import_styled_components19 = __toESM(require("styled-components"));

// app/components/auth/login.tsx
var import_react25 = require("@remix-run/react");
var import_react26 = __toESM(require("react"));
var import_styled_components15 = __toESM(require("styled-components"));

// app/assets/icons/AnglesRight.tsx
var AnglesRightIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 448 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z",
  fill: props.fill ?? styles.colors.black
}));
var AnglesRight_default = AnglesRightIcon;

// app/components/inputs/TextInput.tsx
var import_react14 = __toESM(require("react"));
var import_styled_components5 = __toESM(require("styled-components"));
var TextInputField = import_styled_components5.default.input`
  font-size: 0.875rem;
  line-height: 2rem;
  padding: 0.125rem 1rem;
  border: 1.5px solid ${styles.colors.gray[140]}40;
  border-radius: 0.375rem;
  outline: none;
  margin: 0;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
  }
`;
var Wrap3 = import_styled_components5.default.div`
  display: flex;
  flex-direction: column;
`;
var Label = import_styled_components5.default.label`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
`;
var TextInput = ({ name: name3, setValue: exposeValue, placeholder, onClick, style, containerStyle, title, defaultValue, password, readOnly, value: forcedValue }) => {
  const [value, setValue] = import_react14.default.useState(defaultValue ?? "");
  return /* @__PURE__ */ import_react14.default.createElement(Wrap3, {
    style: containerStyle
  }, title && /* @__PURE__ */ import_react14.default.createElement(Label, null, title), /* @__PURE__ */ import_react14.default.createElement(TextInputField, {
    placeholder,
    onClick,
    style,
    readOnly,
    name: name3,
    type: password ? "password" : "text",
    value: forcedValue ?? value,
    onChange: (e) => {
      setValue(e.currentTarget.value);
      if (exposeValue)
        exposeValue(e.currentTarget.value);
    }
  }));
};

// app/components/place/place-summary.tsx
var import_react23 = require("@remix-run/react");
var import_react24 = __toESM(require("react"));
var import_styled_components14 = __toESM(require("styled-components"));

// app/assets/icons/AngleRight.tsx
var AngleRightIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 256 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z",
  fill: props.fill ?? styles.colors.black
}));
var AngleRight_default = AngleRightIcon;

// app/assets/icons/Clock.tsx
var ClockIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z",
  fill: props.fill ?? styles.colors.black
}));
var Clock_default = ClockIcon;

// app/assets/icons/Location.tsx
var LocationIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 384 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z",
  fill: props.fill ?? styles.colors.black
}));
var Location_default = LocationIcon;

// app/root.tsx
var import_node3 = require("@remix-run/node");
var import_react15 = require("@remix-run/react");
var import_react16 = __toESM(require("react"));
var import_react17 = require("react");
var import_styled_components6 = __toESM(require("styled-components"));
var UnstyledLink2 = (0, import_styled_components6.default)(import_react15.Link)`
  color: ${styles.colors.white};
  text-decoration: none;
`;
var Body2 = import_styled_components6.default.body`
  margin: 0px;
  padding: 0px;
  overflow-y: ${(props) => props.isLandingPage ? "hidden" : "scroll"};
  & > * {
    font-family: Inter, Source Sans Pro, Roboto, sans-serif;
  }
`;
var WidthRestrictor2 = import_styled_components6.default.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 550px) {
    padding: 0 1rem;
  }
  box-sizing: border-box;
  max-width: ${(props) => props.width ?? "968px"};
`;
var Footer2 = import_styled_components6.default.footer`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  margin: 5rem auto 0;
  text-align: center;
  background-color: ${styles.colors.primary_background};
  &>p {
    color: ${styles.colors.black};
    margin: 0.6rem;
    font-size: 0.8rem;
    text-decoration: none;
  }
`;

// app/utils/forms.ts
var import_node4 = require("@remix-run/node");
var getDateObjectFromTimeString = (s) => {
  return new Date(1, 1, 1, parseInt(s.split(":")[0]) - 1, parseInt(s.split(":")[1]));
};
var getDayOfWeek = (date) => {
  return date.getDay() == 0 ? 6 : date.getDay() - 1;
};
var getStringTimeValue = (date) => {
  const hPrefix = date.getHours() < 10 ? "0" : "";
  const mPrefix = date.getMinutes() < 10 ? "0" : "";
  return `${hPrefix}${date.getHours()}:${mPrefix}${date.getMinutes()}`;
};
var getStringDateValue = (date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
var getInputDateFromString = (date) => date ? `${date.getFullYear()}-${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}` : "";
var areDatesEqual = (date1, date2) => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
var getFormEssentials = async (request) => {
  console.log("await form data");
  const form = await request.formData();
  console.log("await form data");
  const getFormItem = (key) => {
    var _a;
    return ((_a = form.get(key)) == null ? void 0 : _a.toString()) ?? "";
  };
  console.log("await form data");
  const getFormItems = (key) => form.getAll(key).map((r) => r.toString());
  return { form, getFormItem, getFormItems };
};
var badRequest = (data) => (0, import_node4.json)(data, { status: 400 });
var getBaseUrl = (request) => request.url.split("/").slice(0, 3).join("/");
var isValidEmail = (email) => {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
};
var isValidPhone = (phone) => {
  return /\+?[0-9 ()-]{3,15}/g.test(phone);
};

// app/components/place/facilities-indicator.tsx
var import_styled_components7 = __toESM(require("styled-components"));
var Wrap4 = import_styled_components7.default.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.3125rem;
  row-gap: 0.5rem;
`;
var Indicator = import_styled_components7.default.p`
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[2]};
  margin: 0px;
  display: flex;
  border-radius: 0.375rem;
  padding: 0.3rem 0.2rem 0.3rem 0.7rem;
  font-weight: 500;
  gap: 0.5rem;
  align-items: center;
`;
var Amount = import_styled_components7.default.span`
  background-color: ${styles.colors.gray[5]};
  color: ${styles.colors.primary};
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
`;
var FacilitiesIndicator = ({ reservables }) => {
  const { lang } = useLangs();
  const reservableGroups = [];
  reservables.forEach((r) => {
    if (!r.ReservableType)
      return;
    let rg = reservableGroups.find((rg2) => rg2.id == r.ReservableType.id);
    if (rg != null) {
      rg.amountOfReservables += 1;
    } else {
      reservableGroups.push({
        id: r.ReservableType.id,
        name: r.ReservableType.multiLangName ? r.ReservableType.multiLangName[lang] : "",
        amountOfReservables: 1
      });
    }
  });
  return /* @__PURE__ */ React.createElement(Wrap4, null, reservableGroups.map((r) => /* @__PURE__ */ React.createElement(Indicator, {
    key: r.id
  }, r.name, " ", /* @__PURE__ */ React.createElement(Amount, null, "x", r.amountOfReservables))));
};

// app/components/place/place-image.tsx
var import_styled_components8 = __toESM(require("styled-components"));
var ImageWrap = import_styled_components8.default.div`
  border-radius: ${(props) => props.shape == "circle" ? "100%" : "8px"};
  aspect-ratio: ${(props) => props.shape == "circle" ? "1" : ""};
  overflow: hidden;
  width: ${(props) => props.shape == "square" ? "100%" : "9rem"};
  height: ${(props) => props.shape == "square" ? "100%" : "9rem"};
  align-self: center;
  box-shadow: ${(props) => props.shape == "circle" ? styles.shadows[1] : ""};
  background-color: ${styles.colors.gray[30]};
`;
var Image = import_styled_components8.default.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;
var PlaceImage = ({ shape, imageUrl }) => {
  return /* @__PURE__ */ React.createElement(ImageWrap, {
    shape
  }, imageUrl && /* @__PURE__ */ React.createElement(Image, {
    loading: "lazy",
    src: imageUrl
  }));
};

// app/components/place/tag-list.tsx
var import_styled_components13 = __toESM(require("styled-components"));

// app/components/search/search-ui.tsx
var import_react21 = require("@remix-run/react");
var import_react22 = __toESM(require("react"));
var import_styled_components12 = __toESM(require("styled-components"));

// app/assets/icons/CircleInfo.tsx
var CircleInfoIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z",
  fill: props.fill ?? styles.colors.black
}));
var CircleInfo_default = CircleInfoIcon;

// app/assets/icons/Search.tsx
var SearchIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height,
    flexShrink: 0
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z",
  fill: props.fill ?? styles.colors.black
}));
var Search_default = SearchIcon;

// app/components/inputs/MultiSelectorInput.tsx
var import_react18 = __toESM(require("react"));
var import_styled_components9 = __toESM(require("styled-components"));

// app/assets/icons/CaretDown.tsx
var CaretDownIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 320 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z",
  fill: props.fill ?? styles.colors.black
}));
var CaretDown_default = CaretDownIcon;

// app/components/inputs/MultiSelectorInput.tsx
var Wrap5 = import_styled_components9.default.div`
  height: 2.375rem;
  position: relative;
`;
var DropdownWrap = import_styled_components9.default.div`
  display: ${(props) => props.visible ? "block" : "none"};
  position: relative;
  width: 100%;
`;
var Overlay = import_styled_components9.default.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;
var Dropdown = import_styled_components9.default.div`
  position: absolute;
  z-index: 3;
  background-color: white;
  box-shadow: ${styles.shadows[1]};
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  padding: 0;
`;
var TextWrap = import_styled_components9.default.div`
  display: grid;
  grid-template-columns: 1fr 2.25rem;
  height: 2.375rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
var IconWrap = import_styled_components9.default.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var DropdownButton = import_styled_components9.default.button`
  display: block;
  background-color: ${(props) => props.highlighted ? styles.colors.primary : styles.colors.white};
  color: ${(props) => props.highlighted ? styles.colors.white : styles.colors.black};
  border: none;
  width: 100%;
  text-align: left;
  padding: 0.4rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
`;
var MultiSelectorInput = ({ name: name3, placeholder, removedName, addedName, possibleValuesAndTexts, defaultValuesAndTexts }) => {
  const [valuesAndTexts, setValuesAndTexts] = import_react18.default.useState(defaultValuesAndTexts);
  const [addedValuesAndTexts, setAddedValuesAndTexts] = import_react18.default.useState([]);
  const [removedValuesAndTexts, setRemovedValuesAndTexts] = import_react18.default.useState([]);
  const [dropdown, setDropdown] = import_react18.default.useState(false);
  return /* @__PURE__ */ import_react18.default.createElement(Wrap5, null, /* @__PURE__ */ import_react18.default.createElement(TextWrap, {
    onClick: () => {
      console.log("x");
      setDropdown(true);
    }
  }, /* @__PURE__ */ import_react18.default.createElement(TextInput, {
    placeholder,
    style: { cursor: "pointer", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingRight: "2.25rem" },
    containerStyle: { gridColumn: "1 / span 2", gridRow: "1" },
    value: valuesAndTexts.map((v) => v.text).join(", "),
    readOnly: true
  }), /* @__PURE__ */ import_react18.default.createElement(IconWrap, null, /* @__PURE__ */ import_react18.default.createElement(CaretDown_default, {
    height: "1rem"
  }))), /* @__PURE__ */ import_react18.default.createElement(DropdownWrap, {
    visible: dropdown
  }, /* @__PURE__ */ import_react18.default.createElement(Overlay, {
    onClick: () => {
      setDropdown(false);
    }
  }), /* @__PURE__ */ import_react18.default.createElement(Dropdown, null, possibleValuesAndTexts.map((pv) => /* @__PURE__ */ import_react18.default.createElement(DropdownButton, {
    highlighted: valuesAndTexts.map((v) => v.value).includes(pv.value),
    key: pv.value,
    onClick: (e) => {
      e.preventDefault();
      setRemovedValuesAndTexts(() => {
        if (valuesAndTexts.find((v) => v.value == pv.value) && defaultValuesAndTexts.find((v) => v.value == pv.value)) {
          return [...removedValuesAndTexts, pv];
        } else if (removedValuesAndTexts.find((v) => v.value == pv.value)) {
          return [...removedValuesAndTexts.filter((v) => v.value != pv.value)];
        } else {
          return removedValuesAndTexts;
        }
      });
      setAddedValuesAndTexts(() => {
        if (!defaultValuesAndTexts.find((v) => v.value == pv.value) && !valuesAndTexts.find((v) => v.value == pv.value)) {
          return [...addedValuesAndTexts, pv];
        } else if (addedValuesAndTexts.find((v) => v.value == pv.value)) {
          return [...addedValuesAndTexts.filter((v) => v.value != pv.value)];
        } else {
          return addedValuesAndTexts;
        }
      });
      setValuesAndTexts(() => {
        if (valuesAndTexts.find((v) => v.value == pv.value)) {
          return [...valuesAndTexts.filter((v) => v.value != pv.value)];
        } else {
          return [...valuesAndTexts, pv];
        }
      });
    }
  }, pv.text)))), name3 && valuesAndTexts.map((v) => /* @__PURE__ */ import_react18.default.createElement(IdInput, {
    key: v.value,
    name: name3,
    value: v.value
  })), removedName && removedValuesAndTexts.map((v) => /* @__PURE__ */ import_react18.default.createElement(IdInput, {
    key: v.value,
    name: removedName,
    value: v.value
  })), addedName && addedValuesAndTexts.map((v) => /* @__PURE__ */ import_react18.default.createElement(IdInput, {
    key: v.value,
    name: addedName,
    value: v.value
  })));
};

// app/components/inputs/SingleSelectorInput.tsx
var import_react19 = __toESM(require("react"));
var import_styled_components10 = __toESM(require("styled-components"));
var Wrap6 = import_styled_components10.default.div`
  height: 2rem;
`;
var SingleSelectorInput = ({ title, placeholder, name: name3, possibleValuesAndTexts, defaultValueAndText }) => {
  const [valueAndText, setValueAndText] = import_react19.default.useState(defaultValueAndText);
  const [dropdown, setDropdown] = import_react19.default.useState(false);
  return /* @__PURE__ */ import_react19.default.createElement(Wrap6, null, /* @__PURE__ */ import_react19.default.createElement(TextWrap, {
    onClick: () => {
      console.log("x");
      setDropdown(true);
    }
  }, /* @__PURE__ */ import_react19.default.createElement(TextInput, {
    placeholder,
    style: { cursor: "pointer", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingRight: "2.25rem" },
    containerStyle: { gridColumn: "1 / span 2", gridRow: "1" },
    value: valueAndText == null ? void 0 : valueAndText.text,
    readOnly: true
  }), /* @__PURE__ */ import_react19.default.createElement(IconWrap, null, /* @__PURE__ */ import_react19.default.createElement(CaretDown_default, {
    height: "1rem"
  }))), /* @__PURE__ */ import_react19.default.createElement(DropdownWrap, {
    visible: dropdown
  }, /* @__PURE__ */ import_react19.default.createElement(Overlay, {
    onClick: () => {
      setDropdown(false);
    }
  }), /* @__PURE__ */ import_react19.default.createElement(Dropdown, null, possibleValuesAndTexts.map((pv) => /* @__PURE__ */ import_react19.default.createElement(DropdownButton, {
    highlighted: pv.value == (valueAndText == null ? void 0 : valueAndText.value),
    key: pv.value,
    onClick: (e) => {
      e.preventDefault();
      if (pv.value == (valueAndText == null ? void 0 : valueAndText.value)) {
        setValueAndText(null);
      } else {
        setValueAndText(pv);
      }
      setDropdown(false);
    }
  }, pv.text)))), name3 && (valueAndText == null ? void 0 : valueAndText.value) && /* @__PURE__ */ import_react19.default.createElement(IdInput, {
    key: valueAndText.value,
    name: name3,
    value: valueAndText.value
  }));
};

// app/components/search/search-bar.tsx
var import_react20 = __toESM(require("react"));
var import_styled_components11 = __toESM(require("styled-components"));
var SearchBarWrap = import_styled_components11.default.div`
  height: 3.25rem;
  box-shadow: ${styles.shadows[1]};
  background-color: ${styles.colors.white};
  border-radius: 0.375rem;
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: stretch;
  gap: 0.9rem;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  & input {
    border: none;
    outline: none;
    font-size: 1.2rem;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0px;
  }
`;
var SearchBar = ({ defaultValue }) => {
  const { translations: l } = useLangs();
  return /* @__PURE__ */ import_react20.default.createElement(SearchBarWrap, null, /* @__PURE__ */ import_react20.default.createElement(Search_default, {
    height: "1rem",
    fill: styles.colors.gray[90]
  }), /* @__PURE__ */ import_react20.default.createElement("input", {
    placeholder: l.searchPlaceholder,
    name: "searchTerm",
    type: "text",
    defaultValue
  }));
};

// app/components/search/search-ui.tsx
var Wrap7 = import_styled_components12.default.div`
  max-width: 800px;
  margin: 3rem auto 0;
  position: relative;
  padding: 1.25rem 2.75rem;
  @media (max-width: 550px) {
    padding: 1.25rem;
  }
  @media (min-width: 550px) {
    border-radius: 0.5rem;
  }
  ${(props) => props.narrowView ? `
    padding: 1.25rem;
    margin-top: 0;
    @media (max-width: 800px) {
      width: 100%;
      box-sizing: border-box;
    }
  ` : ""}
  background-color: ${styles.colors.action};
`;
var Title2 = import_styled_components12.default.h4`
  margin: 0;
  line-height: 2.375rem;
  color: ${styles.colors.black};
  font-weight: 800;
  font-size: 1rem;
`;
var TagCategoryButton = import_styled_components12.default.button`
  height: 1.875rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.8125rem;
  border-radius: 1rem;
  color: ${(props) => props.selected ? styles.colors.white : styles.colors.primary};
  background-color: ${(props) => props.selected ? styles.colors.primary : styles.colors.white};
  box-shadow: ${styles.shadows[2]};
  border: none;
  cursor: ${(props) => props.noCursor ? "" : "pointer"};
`;
var Flex = import_styled_components12.default.div`
  display: grid;
  align-items: center;
  grid-template-rows: 2.375rem;
  grid-template-columns: minmax(0, auto) 2.2rem 1fr 1.5rem minmax(0, auto) 2.2rem 1fr;
  ${(props) => !props.narrowView ? `@media (max-width: 800px) {
    grid-template-columns: minmax(0, auto) 2.2rem 1fr;
    row-gap: 1.5rem;
  }` : ""}
  @media (max-width: 550px) {
    grid-template-columns: minmax(0, auto) 1fr;
    row-gap: 0.2rem;
  }
  ${(props) => props.narrowView ? `
    grid-template-columns: minmax(0, auto) 1fr;
    row-gap: 0.2rem;
  ` : ""}
  gap: 0.4rem;
`;
var TagFlex = import_styled_components12.default.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;
var InfoButton = import_styled_components12.default.button`
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.6rem;
`;
var StyledForm = (0, import_styled_components12.default)(import_react21.Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
var SearchButton = import_styled_components12.default.button`
  margin: 0px;
  border-radius: 0.375rem;
  border: none;
  background-color: ${styles.colors.primary};
  color: ${styles.colors.white};
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 3.25rem;
  width: 10rem;
  margin: 0px auto;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    transform: scale(1.08);
  }
  box-shadow: ${styles.shadows[0]};
`;
var LargeSpacer = import_styled_components12.default.div`
  @media (max-width: 800px) {
    display: none;
  }
  ${(props) => props.narrowView ? `
    display: none;
  ` : ""}
`;
var InputFieldWrap = import_styled_components12.default.div`
  @media (max-width: 550px) {
    grid-column: 1 / span 2;
  }
  ${(props) => props.narrowView ? `
    grid-column: 1 / span 2;
  ` : ""}
`;
var SearchUI = ({ searchParams, locations, tags, categories, narrowView }) => {
  const locationCityCountry = searchParams.get("selectedLocation");
  const tagIds = searchParams.getAll("tags[]");
  const categoryIds = searchParams.getAll("categories[]");
  const [selectedTags, setSelectedTags] = import_react22.default.useState(tags.filter((t) => tagIds.includes(t.id)));
  const { lang } = useLangs();
  const defaultLocation = locations.find((l) => l.cityCountry == locationCityCountry);
  const defaultLocationName = (defaultLocation == null ? void 0 : defaultLocation.multiLangCity) && (defaultLocation == null ? void 0 : defaultLocation.multiLangCountry) ? `${defaultLocation.multiLangCity[lang]}, ${defaultLocation.multiLangCountry[lang]}` : null;
  const defaultCategories = categoryIds.map((ci) => categories.find((c) => c.id == ci));
  const defaultCategoryNames = defaultCategories.every((c) => c != null) ? defaultCategories.map((c) => (c == null ? void 0 : c.multiLangName) ? `${c.multiLangName[lang]}` : null) : [];
  console.log(categoryIds);
  const getLocationDescription = (l) => `${l.multiLangCity ? l.multiLangCity[lang] : ""}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ""}`;
  return /* @__PURE__ */ import_react22.default.createElement(Wrap7, {
    narrowView: narrowView ?? false
  }, /* @__PURE__ */ import_react22.default.createElement(StyledForm, {
    method: "get",
    action: "/search"
  }, /* @__PURE__ */ import_react22.default.createElement(Flex, {
    narrowView: narrowView ?? false
  }, /* @__PURE__ */ import_react22.default.createElement(Title2, null, "Location"), /* @__PURE__ */ import_react22.default.createElement(InfoButton, {
    onClick: (e) => {
      e.preventDefault();
    }
  }, /* @__PURE__ */ import_react22.default.createElement(CircleInfo_default, {
    height: "0.75rem"
  })), /* @__PURE__ */ import_react22.default.createElement(InputFieldWrap, {
    narrowView: narrowView ?? false
  }, /* @__PURE__ */ import_react22.default.createElement(SingleSelectorInput, {
    placeholder: "Pick a location",
    name: "selectedLocation",
    possibleValuesAndTexts: locations.map((l) => ({ value: l.cityCountry, text: getLocationDescription(l) })),
    defaultValueAndText: locationCityCountry && defaultLocationName ? {
      value: locationCityCountry,
      text: defaultLocationName
    } : null
  })), /* @__PURE__ */ import_react22.default.createElement(LargeSpacer, {
    narrowView: narrowView ?? false
  }), /* @__PURE__ */ import_react22.default.createElement(Title2, null, "Categories"), /* @__PURE__ */ import_react22.default.createElement(InfoButton, {
    onClick: (e) => {
      e.preventDefault();
    }
  }, /* @__PURE__ */ import_react22.default.createElement(CircleInfo_default, {
    height: "0.75rem"
  })), /* @__PURE__ */ import_react22.default.createElement(InputFieldWrap, {
    narrowView: narrowView ?? false
  }, /* @__PURE__ */ import_react22.default.createElement(MultiSelectorInput, {
    placeholder: "Pick categories",
    name: "categories[]",
    possibleValuesAndTexts: categories.map((c) => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : "" })),
    defaultValuesAndTexts: defaultCategoryNames.length > 0 ? defaultCategoryNames.map((c, i) => ({ value: categoryIds[i], text: c ?? "" })) : []
  }))), selectedTags.map((t) => /* @__PURE__ */ import_react22.default.createElement("input", {
    key: t.id,
    hidden: true,
    type: "text",
    name: "tags[]",
    value: t.id,
    readOnly: true
  })), /* @__PURE__ */ import_react22.default.createElement(TagFlex, null, /* @__PURE__ */ import_react22.default.createElement(Title2, null, "Tags"), /* @__PURE__ */ import_react22.default.createElement(InfoButton, {
    onClick: (e) => {
      e.preventDefault();
    }
  }, /* @__PURE__ */ import_react22.default.createElement(CircleInfo_default, {
    height: "0.75rem"
  })), tags.map((t) => /* @__PURE__ */ import_react22.default.createElement(TagCategoryButton, {
    selected: !!selectedTags.find((st) => st.id == t.id),
    onClick: (e) => {
      e.preventDefault();
      setSelectedTags(() => {
        if (selectedTags.find((st) => st.id == t.id)) {
          return selectedTags.filter((st) => st.id != t.id);
        } else {
          return [...selectedTags, t];
        }
      });
    },
    key: t.id
  }, t.multiLangName && t.multiLangName[lang]))), /* @__PURE__ */ import_react22.default.createElement(SearchBar, {
    defaultValue: searchParams.get("searchTerm") ?? ""
  }), /* @__PURE__ */ import_react22.default.createElement(SearchButton, null, "Search", /* @__PURE__ */ import_react22.default.createElement(Search_default, {
    height: "1rem",
    fill: styles.colors.white
  }))));
};

// app/components/place/tag-list.tsx
var Wrap8 = import_styled_components13.default.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-self: center;
`;
var TagList = ({ tags }) => {
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(Wrap8, null, tags.map((t) => /* @__PURE__ */ React.createElement(TagCategoryButton, {
    noCursor: true,
    selected: false,
    key: t.id
  }, t.multiLangName && t.multiLangName[lang])));
};

// app/components/place/place-summary.tsx
var PlaceWrap = import_styled_components14.default.div`
  background-color: ${styles.colors.gray[5]};
  margin-bottom: 2.125rem;
  display: grid;
  grid-template-columns: 11rem 1fr;
  padding: 1.2rem 1.2rem;
  position: relative;
  @media (max-width: ${(props) => props.inSearch ? "1100px" : "800px"}) {
    grid-template-columns: unset;
    grid-template-rows: 11rem 1fr;
  }
  @media (min-width: 550px) {
    border-radius: 0.5rem;
  }
`;
var PlaceName = (0, import_styled_components14.default)(UnstyledLink2)`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${styles.colors.black};
  @media (max-width: ${(props) => props.inSearch ? "1100px" : "800px"}) {
    margin-top: 1rem;
  }
`;
var PlaceInfoWrap = import_styled_components14.default.div`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: grid;
  gap: 0.8rem;
  grid-template-rows: repeat(5, auto);
  justify-self: stretch;
`;
var Address = import_styled_components14.default.p`
  display: flex;
  font-weight: 500;
  margin: 0;
`;
var Flex2 = import_styled_components14.default.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: ${(props) => props.inSearch ? "800px" : "500px"}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
var FlexApart = (0, import_styled_components14.default)(Flex2)`
  justify-content: space-between;
  align-self: stretch;
  @media (max-width: ${(props) => props.inSearch ? "800px" : "500px"}) {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;
var BaseButton = (0, import_styled_components14.default)(import_react23.Link)`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  gap: 1.3rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  text-decoration: none;
  flex-shrink: 0;
  color: ${styles.colors.black};
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
  }
  @media (max-width: ${(props) => props.inSearch ? "800px" : "500px"}) {
    width: 100%;
  }
`;
var SecondaryButton = (0, import_styled_components14.default)(BaseButton)`
  border: 1.5px solid #22222240;
  color: ${styles.colors.gray[140]};
`;
var MainButton = (0, import_styled_components14.default)(BaseButton)`
  border: 1.5px solid ${styles.colors.action};
  background-color: ${styles.colors.action};
`;
var BaseButtonBtn = import_styled_components14.default.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.6rem;
  font-size: 1rem;
  font-weight: bold;
  gap: 1.3rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  text-decoration: none;
  color: ${styles.colors.black};
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
  }
`;
var SecondaryButtonBtn = (0, import_styled_components14.default)(BaseButtonBtn)`
  border: 1.5px solid #22222240;
  color: ${styles.colors.gray[140]};
`;
var MainButtonBtn = (0, import_styled_components14.default)(BaseButtonBtn)`
  border: 1.5px solid ${styles.colors.action};
  background-color: ${styles.colors.action};
  &:disabled {
    background-color: ${styles.colors.gray[60]};
    &:hover {
      transform: none;
      cursor: default;
    }
  }
`;
var Time = import_styled_components14.default.p`
  font-weight: 500;
  margin: 0px;
`;
var getNextImportantTime = (place) => {
  var _a, _b;
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const closeToday = new Date(((_a = place.openingTimes.find((o) => o.day == getDayOfWeek(new Date()))) == null ? void 0 : _a.close) ?? "");
  const openTomorrow = new Date(((_b = place.openingTimes.find((o) => o.day == getDayOfWeek(tomorrow))) == null ? void 0 : _b.open) ?? "");
  if (new Date().getHours() * 60 + new Date().getMinutes() > closeToday.getHours() * 60 + closeToday.getMinutes()) {
    return `Opens at ${openTomorrow.toLocaleTimeString()} tomorrow.`;
  }
  return `Closes at ${closeToday.toLocaleTimeString()} today.`;
};
var PlaceSummary = ({ place, inSearch }) => {
  return /* @__PURE__ */ import_react24.default.createElement(PlaceWrap, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement(PlaceImage, {
    shape: "square",
    imageUrl: place.profilePicUrl
  }), /* @__PURE__ */ import_react24.default.createElement(PlaceInfoWrap, null, /* @__PURE__ */ import_react24.default.createElement(FlexApart, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement(PlaceName, {
    inSearch: inSearch ?? false,
    to: `/${place.id}`
  }, place.name)), /* @__PURE__ */ import_react24.default.createElement(FlexApart, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement(Flex2, {
    inSearch: inSearch ?? false
  }, place.street && place.city && /* @__PURE__ */ import_react24.default.createElement(import_react24.default.Fragment, null, /* @__PURE__ */ import_react24.default.createElement(Location_default, {
    height: "1rem"
  }), /* @__PURE__ */ import_react24.default.createElement(Address, null, place.street, ", ", place.city))), /* @__PURE__ */ import_react24.default.createElement(Flex2, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement(Clock_default, {
    height: "1rem"
  }), /* @__PURE__ */ import_react24.default.createElement(Time, null, getNextImportantTime(place)))), /* @__PURE__ */ import_react24.default.createElement(FacilitiesIndicator, {
    reservables: place.reservables
  }), /* @__PURE__ */ import_react24.default.createElement(TagList, {
    tags: place.tags
  }), /* @__PURE__ */ import_react24.default.createElement(FlexApart, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement("span", null), /* @__PURE__ */ import_react24.default.createElement(Flex2, {
    inSearch: inSearch ?? false
  }, /* @__PURE__ */ import_react24.default.createElement(SecondaryButton, {
    inSearch: inSearch ?? false,
    to: `/${place.id}`
  }, "See Details", /* @__PURE__ */ import_react24.default.createElement(AngleRight_default, {
    height: "1.25rem"
  })), /* @__PURE__ */ import_react24.default.createElement(MainButton, {
    inSearch: inSearch ?? false,
    to: `/${place.id}/reserve`
  }, "Reserve", /* @__PURE__ */ import_react24.default.createElement(AnglesRight_default, {
    height: "1.25rem"
  }))))));
};

// app/components/auth/login.tsx
var AuthWrap = import_styled_components15.default.div`
  max-width: 500px;
  margin: 0px auto;
  margin-top: 2rem;
  box-sizing: border-box;
  background-color: ${styles.colors.gray[5]};
  padding: 0.75rem;
  @media (min-width: 500px) {
    border-radius: 0.25rem;
  }
`;
var FieldSet = import_styled_components15.default.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
var SubmitButton = import_styled_components15.default.button`
  padding: 0.8rem 0rem;
  border: 1.5px solid ${styles.colors.gray[20]};
  border-radius: 0.4rem;
  background-color: ${styles.colors.white};
  cursor: pointer;
  font-size: 0.9rem;
`;
var LoginComponent = ({ a, searchParams, setSearchParams, t }) => {
  var _a, _b, _c;
  import_react26.default.useEffect(() => {
    var _a2, _b2;
    if ((_a2 = a == null ? void 0 : a.fields) == null ? void 0 : _a2.redirectTo) {
      setSearchParams((_b2 = a == null ? void 0 : a.fields) == null ? void 0 : _b2.redirectTo);
    }
  }, [(_a = a == null ? void 0 : a.fields) == null ? void 0 : _a.redirectTo]);
  return /* @__PURE__ */ import_react26.default.createElement(AuthWrap, null, /* @__PURE__ */ import_react26.default.createElement(import_react25.Form, {
    method: "post",
    action: "/authenticate/login"
  }, /* @__PURE__ */ import_react26.default.createElement(FieldSet, {
    disabled: t.state === "submitting"
  }, /* @__PURE__ */ import_react26.default.createElement("input", {
    hidden: true,
    name: "redirectTo",
    defaultValue: searchParams.get("redirectTo") ?? void 0
  }), /* @__PURE__ */ import_react26.default.createElement(TextInput, {
    name: "username",
    defaultValue: ((_b = a == null ? void 0 : a.fields) == null ? void 0 : _b.username) ?? "",
    title: "Username"
  }), /* @__PURE__ */ import_react26.default.createElement(TextInput, {
    password: true,
    name: "password",
    defaultValue: ((_c = a == null ? void 0 : a.fields) == null ? void 0 : _c.password) ?? "",
    title: "Password"
  }), /* @__PURE__ */ import_react26.default.createElement(import_react25.Link, {
    style: { color: styles.colors.black },
    to: "/pwd/forgot"
  }, "Forgot password"), /* @__PURE__ */ import_react26.default.createElement(MainButtonBtn, null, "Sign In", /* @__PURE__ */ import_react26.default.createElement(AnglesRight_default, {
    height: "1.5rem"
  })))));
};

// app/components/auth/register.tsx
var import_react29 = require("@remix-run/react");
var import_react30 = __toESM(require("react"));
var import_styled_components17 = __toESM(require("styled-components"));

// app/components/profile/account-summary.tsx
var import_react27 = require("@remix-run/react");
var import_react28 = __toESM(require("react"));
var import_styled_components16 = __toESM(require("styled-components"));
var Wrap9 = import_styled_components16.default.div`
  background-color: ${styles.colors.gray[5]};
  width: 100%;
`;
var InnerWrap2 = import_styled_components16.default.div`
  display: flex;
  gap: 3rem;
  padding: 2rem 1rem;
  max-width: 968px;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  justify-content: stretch;
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
var Photo = import_styled_components16.default.div`
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  width: 9rem;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: ${styles.colors.gray[20]};
`;
var SectionTitle = import_styled_components16.default.p`
  font-weight: bold;
  font-size: 0.8125rem;
  margin: 0;
  color: ${styles.colors.action};
`;
var Value = import_styled_components16.default.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.2rem;
  margin-bottom: 0;
  line-height: 2.3rem;
`;
var InfoWrap = import_styled_components16.default.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  column-gap: 1rem;
  row-gap: 1.2rem;
  & > div {
    width: 100%;
    max-width: 100%;
    flex-shrink: 1;
    position: relative;
    overflow: hidden;
    @media (min-width: 500px) {
      width: 45%; 
    }
  }
  & > div > p {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
var StretchForm2 = (0, import_styled_components16.default)(import_react27.Form)`
  flex-grow: 1;
  max-width: 100%;
`;
var HeaderWrap = import_styled_components16.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
var Title3 = import_styled_components16.default.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;
var EditButton = (0, import_styled_components16.default)(SecondaryButton)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${styles.colors.white};
  width: auto !important;
`;
var EditButtonBtn = (0, import_styled_components16.default)(SecondaryButtonBtn)`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: ${styles.colors.white};
  width: auto !important;
`;
var ErrorLabel = import_styled_components16.default.p`
  position: absolute;
  margin: 0;
  top: 0;
  right: 0;
  border-radius: 0.25rem;
  font-size: 0.6rem;
  background-color: ${styles.colors.busy};
  font-weight: 500;
  color: ${styles.colors.white};
  padding: 0.1rem 0.5rem;
`;
var AccountSummary = ({ editing, user }) => {
  const form = import_react28.default.useRef(null);
  const submit = (0, import_react27.useSubmit)();
  const [validEmail, setValidEmail] = (0, import_react28.useState)(true);
  const [validPhone, setValidPhone] = (0, import_react28.useState)(true);
  return user && /* @__PURE__ */ import_react28.default.createElement(Wrap9, null, /* @__PURE__ */ import_react28.default.createElement(InnerWrap2, null, /* @__PURE__ */ import_react28.default.createElement(Photo, null, user.username[0].toUpperCase()), /* @__PURE__ */ import_react28.default.createElement(StretchForm2, {
    method: "post",
    ref: form
  }, /* @__PURE__ */ import_react28.default.createElement(HeaderWrap, null, /* @__PURE__ */ import_react28.default.createElement(Title3, null, "Personal Information"), !editing ? /* @__PURE__ */ import_react28.default.createElement(EditButton, {
    inSearch: false,
    to: "/profile/edit"
  }, "Edit") : /* @__PURE__ */ import_react28.default.createElement(EditButtonBtn, {
    disabled: !validEmail || !validPhone,
    onClick: (e) => {
      e.preventDefault();
      if (validEmail && validPhone) {
        submit(form.current, { replace: true });
      }
    }
  }, !editing ? "Edit" : "Save")), /* @__PURE__ */ import_react28.default.createElement(InfoWrap, null, editing && /* @__PURE__ */ import_react28.default.createElement(IdInput, {
    name: "id",
    value: user == null ? void 0 : user.id
  }), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "First Name"), editing ? /* @__PURE__ */ import_react28.default.createElement(TextInput, {
    name: "firstName",
    defaultValue: user == null ? void 0 : user.firstName
  }) : /* @__PURE__ */ import_react28.default.createElement(Value, null, user == null ? void 0 : user.firstName)), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "Last Name"), editing ? /* @__PURE__ */ import_react28.default.createElement(TextInput, {
    name: "lastName",
    defaultValue: user == null ? void 0 : user.lastName
  }) : /* @__PURE__ */ import_react28.default.createElement(Value, null, user == null ? void 0 : user.lastName)), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "Email"), editing ? /* @__PURE__ */ import_react28.default.createElement(TextInput, {
    setValue: (s) => {
      setValidEmail(isValidEmail(s));
    },
    name: "email",
    defaultValue: user == null ? void 0 : user.email
  }) : /* @__PURE__ */ import_react28.default.createElement(Value, null, user == null ? void 0 : user.email), editing && !validEmail && /* @__PURE__ */ import_react28.default.createElement(ErrorLabel, null, "Invalid email")), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "Phone"), editing ? /* @__PURE__ */ import_react28.default.createElement(TextInput, {
    setValue: (s) => {
      setValidPhone(isValidPhone(s));
      console.log(isValidPhone(s));
    },
    name: "phone",
    defaultValue: user == null ? void 0 : user.phone
  }) : /* @__PURE__ */ import_react28.default.createElement(Value, null, user == null ? void 0 : user.phone), editing && !validPhone && /* @__PURE__ */ import_react28.default.createElement(ErrorLabel, null, "Invalid phone")), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "Username"), editing && false ? /* @__PURE__ */ import_react28.default.createElement(TextInput, {
    name: "username",
    defaultValue: (user == null ? void 0 : user.username) ?? ""
  }) : /* @__PURE__ */ import_react28.default.createElement(Value, null, user == null ? void 0 : user.username)), /* @__PURE__ */ import_react28.default.createElement("div", null, /* @__PURE__ */ import_react28.default.createElement(SectionTitle, null, "Reserving since"), /* @__PURE__ */ import_react28.default.createElement(Value, null, new Date(user == null ? void 0 : user.createdAt).toDateString()))))));
};

// app/components/auth/register.tsx
var PwdWarn = import_styled_components17.default.p`
  margin: 0;
  color: ${styles.colors.busy};
  font-size: 0.875rem;
`;
var PwdInfo = import_styled_components17.default.p`
  margin: 0;
  color: ${styles.colors.black};
  font-size: 0.875rem;
`;
var ConditionsText = import_styled_components17.default.p`
  margin: 0;
  color: ${styles.colors.black};
  font-size: 0.8125rem;
`;
var Bar = import_styled_components17.default.div`
  width: ${(props) => props.width}%;
  height: 6px;
  min-width: 6px;
  border-radius: 3px;
  background-color: ${(props) => props.width < 25 ? styles.colors.busy : props.width < 50 ? styles.colors.warn : props.width < 75 ? styles.colors.primary : styles.colors.free};
`;
var BarBack = import_styled_components17.default.div`
  width: 100%;
  background-color: ${styles.colors.gray[70]};
  height: 6px;
  border-radius: 3px;
`;
var RelativeWrap = import_styled_components17.default.div`
  position: relative;
`;
var ItB = (b) => b ? 1 : 0;
var checkPasswordStrength = (pwd) => {
  const specialChar = /[!-\/]|[:-@]|[\[-`]|[{-~]/.test(pwd);
  const number = /[0-9]/.test(pwd);
  const lowerCase = /[a-z]/.test(pwd);
  const upperCase = /[A-Z]/.test(pwd);
  const length = Math.min(pwd.length, 12) / 2;
  return ItB(specialChar) * 2 + ItB(number) * 2 + ItB(lowerCase) + ItB(upperCase) + length;
};
var RegisterComponent = ({ a, searchParams, setSearchParams, t }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  import_react30.default.useEffect(() => {
    var _a2, _b2;
    if ((_a2 = a == null ? void 0 : a.fields) == null ? void 0 : _a2.redirectTo) {
      setSearchParams((_b2 = a == null ? void 0 : a.fields) == null ? void 0 : _b2.redirectTo);
    }
  }, [(_a = a == null ? void 0 : a.fields) == null ? void 0 : _a.redirectTo]);
  const [pwd, setPwd] = (0, import_react30.useState)("");
  const [cpwd, setCPwd] = (0, import_react30.useState)("");
  const s = Math.max(checkPasswordStrength(pwd), checkPasswordStrength(cpwd));
  const pwdString = s <= 3 ? "Very weak" : s <= 6 ? "Weak" : s <= 9 ? "Moderate" : s < 12 ? "Strong" : "Very Strong";
  const [validEmail, setValidEmail] = (0, import_react30.useState)(true);
  const [validPhone, setValidPhone] = (0, import_react30.useState)(true);
  return /* @__PURE__ */ import_react30.default.createElement(AuthWrap, null, /* @__PURE__ */ import_react30.default.createElement(import_react29.Form, {
    method: "post",
    action: "/authenticate/register"
  }, /* @__PURE__ */ import_react30.default.createElement(FieldSet, {
    disabled: t.state === "submitting"
  }, /* @__PURE__ */ import_react30.default.createElement("input", {
    hidden: true,
    name: "redirectTo",
    defaultValue: searchParams.get("redirectTo") ?? void 0
  }), /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    title: "Username",
    name: "username",
    defaultValue: ((_b = a == null ? void 0 : a.fields) == null ? void 0 : _b.username) ?? ""
  }), /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    setValue: setPwd,
    title: "Password",
    password: true,
    name: "password",
    defaultValue: ((_c = a == null ? void 0 : a.fields) == null ? void 0 : _c.password) ?? ""
  }), /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    setValue: setCPwd,
    title: "Confirm Password",
    password: true,
    name: "confirmPassword",
    defaultValue: ((_d = a == null ? void 0 : a.fields) == null ? void 0 : _d.password) ?? ""
  }), /* @__PURE__ */ import_react30.default.createElement(BarBack, null, /* @__PURE__ */ import_react30.default.createElement(Bar, {
    width: s / 12 * 100
  })), s > 0 && pwd == cpwd && /* @__PURE__ */ import_react30.default.createElement(PwdInfo, null, "Your password is ", /* @__PURE__ */ import_react30.default.createElement("strong", null, pwdString)), pwd.length == 0 && cpwd.length == 0 && /* @__PURE__ */ import_react30.default.createElement(PwdInfo, null, "Choose a strong password."), pwd != cpwd && /* @__PURE__ */ import_react30.default.createElement(PwdWarn, null, "Your passwords don't match."), /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    title: "First Name",
    name: "firstName",
    defaultValue: ((_e = a == null ? void 0 : a.fields) == null ? void 0 : _e.firstName) ?? ""
  }), /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    title: "Last Name",
    name: "lastName",
    defaultValue: ((_f = a == null ? void 0 : a.fields) == null ? void 0 : _f.lastName) ?? ""
  }), /* @__PURE__ */ import_react30.default.createElement(RelativeWrap, null, /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    setValue: (s2) => {
      setValidEmail(isValidEmail(s2));
    },
    title: "Email",
    name: "email",
    defaultValue: ((_g = a == null ? void 0 : a.fields) == null ? void 0 : _g.email) ?? ""
  }), !validEmail && /* @__PURE__ */ import_react30.default.createElement(ErrorLabel, null, "Invalid email")), /* @__PURE__ */ import_react30.default.createElement(RelativeWrap, null, /* @__PURE__ */ import_react30.default.createElement(TextInput, {
    setValue: (s2) => {
      setValidPhone(isValidPhone(s2));
    },
    title: "Phone Number",
    name: "phone",
    defaultValue: ((_h = a == null ? void 0 : a.fields) == null ? void 0 : _h.phone) ?? ""
  }), !validPhone && /* @__PURE__ */ import_react30.default.createElement(ErrorLabel, null, "Invalid phone")), /* @__PURE__ */ import_react30.default.createElement(ConditionsText, null, "By creating an account, you agree with us sending you necessary email corespondence. (Password resets, confirmation emails, etc.)"), /* @__PURE__ */ import_react30.default.createElement(ConditionsText, null, "Your details (name, email, phone) may be shared with those places where you make reservations."), /* @__PURE__ */ import_react30.default.createElement(MainButtonBtn, {
    disabled: !validEmail || !validPhone,
    onClick: (e) => {
      if (!validEmail || !validPhone) {
        e.preventDefault();
      }
    }
  }, "Create Account", /* @__PURE__ */ import_react30.default.createElement(AnglesRight_default, {
    height: "1.5rem"
  })), a && a.formError && /* @__PURE__ */ import_react30.default.createElement("p", null, a.formError))));
};

// app/components/icon-row.tsx
var import_styled_components18 = __toESM(require("styled-components"));

// app/assets/icons/Baseball.tsx
var BaseballIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M429.6 272.9c0-16.26 16.36-16.81 29.99-16.81l2.931 .0029c16.64 0 33.14 2.056 49.2 5.834C511.7 259.9 512 258 512 256c0-141.4-114.6-256-256-256C253.9 0 251.1 .2578 249.9 .3047c3.658 15.51 6.111 31.34 6.111 47.54c0 6-.2813 12.03-.7813 18C254.6 74.19 247.6 80.5 239.3 80.5c-6.091 0-16.03-4.68-16.03-15.97c0-1.733 .7149-7.153 .7149-16.69c0-15.26-2.389-30.18-6.225-44.69C106.9 19.79 19.5 107.3 3.08 218.3c14.44 3.819 29.38 5.79 44.45 5.79c10.07 0 15.59-.811 17.42-.811c6.229 0 16.49 4.657 16.49 15.99c0 16.11-16.13 16.77-29.73 16.77L48.16 256c-16.33 0-32.25-2.445-47.85-6.109C.2578 251.1 0 253.9 0 256c0 141.4 114.6 256 256 256c2.066 0 4.062-.2578 6.117-.3086C258.5 496.2 256 480.4 256 464.2c0-5.688 .25-11.38 .7187-17.03c.6964-8.538 8.287-14.61 16.49-14.61c7.1 0 15.44 6.938 15.44 15.92c0 2.358-.6524 5.88-.6524 15.72c0 15.25 2.383 30.16 6.209 44.66c110.8-16.63 198.2-104.1 214.7-215c-14.55-3.851-29.59-5.871-44.74-5.871c-10.47 0-16.24 .895-18.13 .895C443.3 288.9 429.6 286.5 429.6 272.9zM238.2 128.9c0 27.78-78.3 108.1-108.6 108.1c-8.612 0-16.01-6.963-16.01-15.98c0-6.002 3.394-11.75 9.163-14.49c80.3-38.08 76.21-94.5 99.39-94.5C234.7 112.8 238.2 124.2 238.2 128.9zM397.5 290.6c0 5.965-3.364 11.68-9.131 14.43c-78.82 37.57-75.92 95-98.94 95c-12.58 0-16.01-11.54-16.01-16.03c0-28 78.29-109.4 108.1-109.4C390.8 274.6 397.5 282.3 397.5 290.6z",
  fill: props.fill ?? styles.colors.black
}));
var Baseball_default = BaseballIcon;

// app/assets/icons/BowlingBall.tsx
var BowlingBallIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM144 208c-17.7 0-32-14.25-32-32s14.3-32 32-32s32 14.25 32 32S161.7 208 144 208zM240 80c17.66 0 31.95 14.25 31.95 32s-14.29 32-31.95 32s-32.05-14.25-32.05-32S222.4 80 240 80zM240 240c-17.7 0-32-14.25-32-32s14.3-32 32-32s32 14.25 32 32S257.7 240 240 240z",
  fill: props.fill ?? styles.colors.black
}));
var BowlingBall_default = BowlingBallIcon;

// app/assets/icons/Dumbell.tsx
var DumbellIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 640 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M104 96h-48C42.75 96 32 106.8 32 120V224C14.33 224 0 238.3 0 256c0 17.67 14.33 32 31.1 32L32 392C32 405.3 42.75 416 56 416h48C117.3 416 128 405.3 128 392v-272C128 106.8 117.3 96 104 96zM456 32h-48C394.8 32 384 42.75 384 56V224H256V56C256 42.75 245.3 32 232 32h-48C170.8 32 160 42.75 160 56v400C160 469.3 170.8 480 184 480h48C245.3 480 256 469.3 256 456V288h128v168c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V56C480 42.75 469.3 32 456 32zM608 224V120C608 106.8 597.3 96 584 96h-48C522.8 96 512 106.8 512 120v272c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V288c17.67 0 32-14.33 32-32C640 238.3 625.7 224 608 224z",
  fill: props.fill ?? styles.colors.black
}));
var Dumbell_default = DumbellIcon;

// app/assets/icons/FireFlameCurved.tsx
var FireFlameCurvedIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 384 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M384 319.1C384 425.9 297.9 512 192 512s-192-86.13-192-192c0-58.67 27.82-106.8 54.57-134.1C69.54 169.3 96 179.8 96 201.5v85.5c0 35.17 27.97 64.5 63.16 64.94C194.9 352.5 224 323.6 224 288c0-88-175.1-96.12-52.15-277.2c13.5-19.72 44.15-10.77 44.15 13.03C215.1 127 384 149.7 384 319.1z",
  fill: props.fill ?? styles.colors.black
}));
var FireFlameCurved_default = FireFlameCurvedIcon;

// app/assets/icons/Futbol.tsx
var FutbolIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z",
  fill: props.fill ?? styles.colors.black
}));
var Futbol_default = FutbolIcon;

// app/assets/icons/GolfBallTee.tsx
var GolfBallTeeIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 384 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M96 399.1c0 17.67 14.33 31.1 32 31.1s32 14.33 32 31.1v48h64v-48c0-17.67 14.33-31.1 32-31.1s32-14.33 32-31.1v-16H96V399.1zM192 .0001c-106 0-192 86.68-192 193.6c0 65.78 32.82 123.5 82.52 158.4h218.1C351.2 317.1 384 259.4 384 193.6C384 86.68 298 .0001 192 .0001zM179 205.1C183 206.9 187.4 208 192 208c17.53 0 31.74-14.33 31.74-31.1c0-4.688-1.111-9.062-2.904-13.07c11.03 5.016 18.77 16.08 18.77 29.07c0 17.67-14.21 31.1-31.74 31.1C194.1 224 184 216.2 179 205.1zM223.7 303.1c-12.88 0-23.86-7.812-28.83-18.93c3.977 1.809 8.316 2.93 12.96 2.93c17.53 0 31.74-14.33 31.74-31.1c0-4.688-1.109-9.062-2.904-13.07c11.03 5.016 18.77 16.08 18.77 29.07C255.5 289.7 241.3 303.1 223.7 303.1zM287.2 240c-12.88 0-23.86-7.812-28.83-18.93c3.977 1.809 8.316 2.93 12.96 2.93c17.53 0 31.73-14.33 31.73-31.1c0-4.688-1.109-9.062-2.902-13.07C311.2 183.9 318.9 195 318.9 208C318.9 225.7 304.7 240 287.2 240z",
  fill: props.fill ?? styles.colors.black
}));
var GolfBallTee_default = GolfBallTeeIcon;

// app/assets/icons/Heart.tsx
var HeartIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z",
  fill: props.fill ?? styles.colors.black
}));
var Heart_default = HeartIcon;

// app/assets/icons/PersonSwimming.tsx
var PersonSwimmingIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 576 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M192.4 320c63.38 0 54.09-39.67 95.33-40.02c42.54 .3672 31.81 40.02 95.91 40.02c39.27 0 55.72-18.41 62.21-24.83l-140.4-116.1c3.292-1.689 31.66-18.2 75.25-18.2c12.57 0 25.18 1.397 37.53 4.21l38.59 8.844c2.412 .5592 4.824 .8272 7.2 .8272c15.91 0 31.96-12.81 31.96-32.04c0-14.58-10.03-27.77-24.84-31.16l-38.59-8.844c-17.06-3.904-34.46-5.837-51.81-5.837c-120.1 0-177.4 85.87-178.1 88.02L179.1 213.3C158.1 241.3 147.4 273.8 145 307.7C157.5 315.4 174.3 320 192.4 320zM576 397c0-15.14-10.82-28.59-26.25-31.42c-48.52-8.888-45.5-29.48-69.6-29.48c-25.02 0-31.19 31.79-96.18 31.79c-48.59 0-72.72-22.06-73.38-22.62c-6.141-6.157-14.26-9.188-22.42-9.188c-24.75 0-31.59 31.81-96.2 31.81c-48.59 0-72.69-22.03-73.41-22.59c-6.125-6.157-14.3-9.245-22.46-9.245c-8.072 0-16.12 3.026-22.38 8.901c-29.01 26.25-73.75 12.54-73.75 52.08c0 16.08 12.77 32.07 31.71 32.07c9.77 0 39.65-7.34 64.26-21.84C115.5 418.8 147.4 431.1 192 431.1s76.5-13.12 96-24.66c19.53 11.53 51.47 24.59 96 24.59c44.59 0 76.56-13.09 96.06-24.62c24.71 14.57 54.74 21.83 64.24 21.83C563.2 429.1 576 413.3 576 397zM95.1 224c35.35 0 64-28.65 64-64c0-35.35-28.65-64-64-64s-64 28.65-64 64C31.1 195.3 60.65 224 95.1 224z",
  fill: props.fill ?? styles.colors.black
}));
var PersonSwimming_default = PersonSwimmingIcon;

// app/assets/icons/Spa.tsx
var SpaIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 576 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M568.3 192c-29 .125-135 6.124-213.9 82.1C321.2 304.7 301 338.3 288 369.9c-13-31.63-33.25-65.25-66.38-94.87C142.8 198.2 36.75 192.2 7.75 192C3.375 192 0 195.4 0 199.9c.25 27.88 7.125 126.2 88.75 199.3C172.8 481 256 479.1 288 479.1s115.2 1.025 199.3-80.85C568.9 326 575.8 227.7 576 199.9C576 195.4 572.6 192 568.3 192zM288 302.6c12.75-18.87 27.62-35.75 44.13-50.5c19-18.62 39.5-33.37 60.25-45.25c-16.5-70.5-51.75-133-96.75-172.3c-4.125-3.5-11-3.5-15.12 0c-45 39.25-80.25 101.6-96.75 172.1c20.37 11.75 40.5 26.12 59.25 44.37C260 266.4 275.1 283.7 288 302.6z",
  fill: props.fill ?? styles.colors.black
}));
var Spa_default = SpaIcon;

// app/assets/icons/TableTennisPaddleBall.tsx
var TableTennisPaddleBallIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M416 287.1c27.99 0 53.68 9.254 74.76 24.51c14.03-29.82 21.06-62.13 21.06-94.43c0-103.1-79.37-218.1-216.5-218.1c-59.94 0-120.4 23.71-165.5 68.95l-54.66 54.8C73.61 125.3 72.58 126.1 71.14 128.5l230.7 230.7C322.8 317.2 365.8 287.1 416 287.1zM290.3 392.1l-238.6-238.6C38.74 176.2 32.3 199.4 32.3 221.9c0 30.53 11.71 59.94 34.29 82.58l36.6 36.7l-92.38 81.32c-7.177 6.255-10.81 15.02-10.81 23.81c0 8.027 3.032 16.07 9.164 22.24l34.05 34.2c6.145 6.16 14.16 9.205 22.15 9.205c8.749 0 17.47-3.649 23.7-10.86l81.03-92.85l35.95 36.04c23.62 23.68 54.41 35.23 85.37 35.23c4.532 0 9.205-.2677 13.72-.7597c-10.56-18.61-17.12-39.89-17.12-62.81C288 408.1 288.1 400.5 290.3 392.1zM415.1 320c-52.99 0-95.99 42.1-95.99 95.1c0 52.1 42.99 95.99 95.99 95.99c52.1 0 95.99-42.1 95.99-95.99C511.1 363 468.1 320 415.1 320z",
  fill: props.fill ?? styles.colors.black
}));
var TableTennisPaddleBall_default = TableTennisPaddleBallIcon;

// app/assets/icons/Volleyball.tsx
var VolleyballIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M200.3 106C185.4 80.24 165.2 53.9 137.4 29.26C55.75 72.05 0 157.4 0 256c0 21.33 2.898 41.94 7.814 61.75C53.59 182.1 155.1 124.9 200.3 106zM381.7 281.1c1.24-9.223 2.414-22.08 2.414-37.65c0-59.1-16.93-157.2-111.5-242.6C267.1 .4896 261.6 0 256 0C225.5 0 196.5 5.591 169.4 15.36c93.83 90.15 102.6 198.5 102.8 231.7C287.8 255.9 327.3 275.1 381.7 281.1zM240.1 246.5C239.1 228.5 236.9 184.7 214.9 134.6C173.6 151.6 60.4 211.7 26.67 369.2c15.66 31.64 37.52 59.66 64.22 82.23C122 325.1 211.5 263.3 240.1 246.5zM326.5 10.07c74.79 84.9 89.5 175.9 89.5 234c0 15.45-1.042 28.56-2.27 38.61l.5501 .0005c29.54 0 62.2-4.325 97.16-15.99C511.6 263.1 512 259.6 512 256C512 139.1 433.6 40.72 326.5 10.07zM255.7 274.5c-15.43 9.086-51.89 33.63-84.32 77.86c26.34 20.33 93.51 63.27 189.5 63.27c32.83 0 69.02-5.021 108.1-17.69c19.08-28.59 32.41-61.34 38.71-96.47C474.5 311.1 443 315 414.4 315C334.6 315 276.5 286.3 255.7 274.5zM153.1 379.3c-14.91 25.71-27.62 56.33-35.03 92.72C158.6 497.2 205.5 512 256 512c69 0 131.5-27.43 177.5-71.82c-25.42 5.105-49.71 7.668-72.38 7.668C258.6 447.8 185.5 402.1 153.1 379.3z",
  fill: props.fill ?? styles.colors.black
}));
var Volleyball_default = VolleyballIcon;

// app/assets/icons/WeightHanging.tsx
var WeightHangingIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M510.3 445.9L437.3 153.8C433.5 138.5 420.8 128 406.4 128H346.1c3.625-9.1 5.875-20.75 5.875-32c0-53-42.1-96-96-96S159.1 43 159.1 96c0 11.25 2.25 22 5.875 32H105.6c-14.38 0-27.13 10.5-30.88 25.75l-73.01 292.1C-6.641 479.1 16.36 512 47.99 512h416C495.6 512 518.6 479.1 510.3 445.9zM256 128C238.4 128 223.1 113.6 223.1 96S238.4 64 256 64c17.63 0 32 14.38 32 32S273.6 128 256 128z",
  fill: props.fill ?? styles.colors.black
}));
var WeightHanging_default = WeightHangingIcon;

// app/components/icon-row.tsx
var Wrap10 = import_styled_components18.default.div`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.invertedColors ? styles.colors.white : styles.colors.primary};
  padding: 1rem 0rem;
  max-width: 968px;
  width: 66vw;
  overflow: hidden;
  margin: 0 auto;
`;
var Overlay2 = import_styled_components18.default.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: ${(props) => props.invertedColors ? `linear-gradient(to right, ${styles.colors.white}FF, ${styles.colors.white}00, ${styles.colors.white}FF)` : `linear-gradient(to right, ${styles.colors.primary}FF, ${styles.colors.primary}00, ${styles.colors.primary}FF)`};
`;
var ListItem = import_styled_components18.default.div`
  display: flex;
  gap: 0.25rem;
  &>svg {
    flex-shrink: 0;
  }
`;
var IconRow = ({ invertColors }) => /* @__PURE__ */ React.createElement(Wrap10, {
  invertedColors: invertColors
}, /* @__PURE__ */ React.createElement(Overlay2, {
  invertedColors: invertColors
}), [...Array(4).keys()].map((i) => /* @__PURE__ */ React.createElement(ListItem, {
  key: i
}, /* @__PURE__ */ React.createElement(TableTennisPaddleBall_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(FireFlameCurved_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(BowlingBall_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Dumbell_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Volleyball_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(GolfBallTee_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Spa_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Futbol_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Heart_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(WeightHanging_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(Baseball_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}), /* @__PURE__ */ React.createElement(PersonSwimming_default, {
  height: "1.64rem",
  fill: styles.colors.gray[70]
}))));

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/authenticate.tsx
var loader3 = () => {
  return {};
};
var Title4 = import_styled_components19.default.h2`
  color: ${styles.colors.black};
  text-align: center;
  font-size: 1.375rem;
  margin: 2rem 0rem 1rem;
  @media (min-width: 500px) {
    font-size: 2rem;
  }
  @media (min-width: 800px) {
    font-size: 2.3rem;
  }
`;
var TabBar = import_styled_components19.default.div`
  margin: 1rem auto;
  width: 95%;
  max-width: 500px;
  justify-content: center;
  align-items: stretch;
  display: flex;
  padding: 0.5rem 0rem;
  border: 1.5px solid ${styles.colors.gray[140]}40;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;
var Separator2 = import_styled_components19.default.div`
  width: 1px;
  background-color: ${styles.colors.gray[50]};
`;
var AuthTabButton = import_styled_components19.default.button`
  width: 50%;
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  color: ${styles.colors.gray[110]};
  font-weight: bold;
  text-decoration: none;
`;
var ActiveHighlighter = import_styled_components19.default.div`
  position: absolute;
  height: calc(100% - 0.4rem);
  border-radius: 0.25rem;
  width: calc(50% - 0.4rem);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  left: ${(props) => props.position == 0 ? "0px" : "50%"};
  top: 0px;
  margin: 0.2rem;
  background-color: ${styles.colors.action};
  z-index: -1;
`;
function Authenticate() {
  const [searchParams, setSearchParams] = (0, import_react31.useSearchParams)();
  const a = (0, import_react31.useActionData)();
  const t = (0, import_react31.useTransition)();
  const redirectTo = encodeURI(searchParams.get("redirectTo") ?? "").replace("/", "%2F");
  const [position, setPosition] = import_react32.default.useState(0);
  const { setSigningIn } = useWhereAreWe();
  import_react32.default.useEffect(() => {
    setSigningIn(true);
    return () => {
      setSigningIn(false);
    };
  }, []);
  return /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, /* @__PURE__ */ import_react32.default.createElement(Title4, null, "Welcome to Reserveroo."), /* @__PURE__ */ import_react32.default.createElement(IconRow, {
    invertColors: true
  }), /* @__PURE__ */ import_react32.default.createElement(TabBar, null, /* @__PURE__ */ import_react32.default.createElement(ActiveHighlighter, {
    position
  }), /* @__PURE__ */ import_react32.default.createElement(AuthTabButton, {
    onClick: () => {
      setPosition(0);
    }
  }, "Sign In"), /* @__PURE__ */ import_react32.default.createElement(Separator2, null), /* @__PURE__ */ import_react32.default.createElement(AuthTabButton, {
    onClick: () => {
      setPosition(1);
    }
  }, "Create Account")), /* @__PURE__ */ import_react32.default.createElement("div", null, position == 0 && /* @__PURE__ */ import_react32.default.createElement(LoginComponent, {
    a,
    searchParams,
    setSearchParams: (data) => {
      setSearchParams(data);
    },
    t
  }), position == 1 && /* @__PURE__ */ import_react32.default.createElement(RegisterComponent, {
    a,
    searchParams,
    setSearchParams: (data) => {
      setSearchParams(data);
    },
    t
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/authenticate/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action2
});
var import_server_runtime2 = require("@remix-run/server-runtime");

// app/utils/signing.server.ts
var import_crypto2 = require("crypto");
var publicKey = process.env.SIGNING_PUBLIC_KEY ?? "";
while (publicKey.includes("_")) {
  publicKey = publicKey.replace("_", "\n");
}
while (publicKey.includes(",")) {
  publicKey = publicKey.replace(",", " ");
}
var privateKey = process.env.SIGNING_PRIVATE_KEY ?? "";
while (privateKey.includes("_")) {
  privateKey = privateKey.replace("_", "\n");
}
while (privateKey.includes(",")) {
  privateKey = privateKey.replace(",", " ");
}
var signMessage = (message) => {
  if (privateKey && publicKey) {
    const signer = (0, import_crypto2.createSign)("rsa-sha256");
    signer.update(message);
    return signer.sign(privateKey, "hex");
  }
  throw Error("No public or private key for signing");
};
var verifyMessage = (message, signature) => {
  if (privateKey && publicKey) {
    const verifier = (0, import_crypto2.createVerify)("rsa-sha256");
    verifier.update(message);
    return verifier.verify(publicKey, signature, "hex");
  }
  throw Error("No public or private key for signing");
};

// app/utils/emails.server.ts
var sendEmailConfirmationEmail = async (sendToAddress, baseUrl) => {
  const msg = sendToAddress;
  const signature = signMessage(msg);
  const emailParams = {
    Source: "reserveroo@reserveroo.com",
    Destination: {
      ToAddresses: [
        "success@simulator.amazonses.com"
      ]
    },
    Message: {
      Subject: {
        Data: "Reserveroo - Verify Email Address",
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: "Click the link to verify: ",
          Charset: "UTF-8"
        }
      }
    }
  };
  console.log("Link that would otherwise be in email:");
  console.log(`${baseUrl}/verifyEmail?verifyToken=${msg}:${signature}`);
  const response = await ses.sendEmail(emailParams);
};
var sendPwdResetEmail = async (sendToAddress, baseUrl, msg) => {
  const signature = signMessage(msg);
  const emailParams = {
    Source: "reserveroo@reserveroo.com",
    Destination: {
      ToAddresses: [
        "success@simulator.amazonses.com"
      ]
    },
    Message: {
      Subject: {
        Data: "Reserveroo - Password Reset",
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: "Click the link to reset: ",
          Charset: "UTF-8"
        }
      }
    }
  };
  console.log("Link that would otherwise be in email:");
  console.log(`${baseUrl}/pwd/reset?token=${msg}:${signature}`);
  const response = await ses.sendEmail(emailParams);
};
var sendCreationEmail = async (username) => {
  const emailParams = {
    Source: "reserveroo@reserveroo.com",
    Destination: {
      ToAddresses: [
        "success@simulator.amazonses.com"
      ]
    },
    Message: {
      Subject: {
        Data: `Reserveroo - New Reservation!!`,
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: `${username} created a new reservation!!`,
          Charset: "UTF-8"
        }
      }
    }
  };
  console.log("Sent creation email to all of us.");
  const response = await ses.sendEmail(emailParams);
};
var sendCancellationEmail = async () => {
  const emailParams = {
    Source: "reserveroo@reserveroo.com",
    Destination: {
      ToAddresses: [
        "success@simulator.amazonses.com"
      ]
    },
    Message: {
      Subject: {
        Data: `Reserveroo - CANCELLED Reservation!!`,
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: `A reservation was just cancelled by a user.`,
          Charset: "UTF-8"
        }
      }
    }
  };
  console.log("Sent cancellation email to all of us.");
  const response = await ses.sendEmail(emailParams);
};
var sendStatusUpdateEmail = async (sendToAddress, status, place, start) => {
  const emailParams = {
    Source: "reserveroo@reserveroo.com",
    Destination: {
      ToAddresses: [
        "success@simulator.amazonses.com"
      ]
    },
    Message: {
      Subject: {
        Data: `Reserveroo - Reservation ${status}`,
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: `Your reservation at ${place} for ${new Date(start).getDate()} ${status}`,
          Charset: "UTF-8"
        }
      }
    }
  };
  console.log("Sent confirmation / rejection email to " + sendToAddress);
  const response = await ses.sendEmail(emailParams);
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/authenticate/register.tsx
var badRequest2 = (data) => (0, import_server_runtime2.json)(data, { status: 400 });
var action2 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const redirectTo = getFormItem("redirectTo");
  const username = getFormItem("username");
  const password = getFormItem("password");
  const phone = getFormItem("phone");
  const email = getFormItem("email");
  const firstName = getFormItem("firstName");
  const lastName = getFormItem("lastName");
  const { userId, admin } = await register({
    username,
    password,
    phone,
    email,
    firstName,
    lastName
  }) ?? { userId: null, admin: false };
  if (userId == null || username == null) {
    return badRequest2({
      fields: { username: username ?? "", password: password ?? "", redirectTo: redirectTo ?? "" },
      formError: "Something is wrong."
    });
  }
  const baseUrl = getBaseUrl(request);
  await sendEmailConfirmationEmail(email, baseUrl);
  return createUserSession(username, admin, false, "/verifyEmail");
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/authenticate/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  var _a, _b, _c;
  const form = await request.formData();
  const username = (_a = form.get("username")) == null ? void 0 : _a.toString();
  const password = (_b = form.get("password")) == null ? void 0 : _b.toString();
  const baseUrl = getBaseUrl(request);
  const redirectTo = (_c = form.get("redirectTo")) == null ? void 0 : _c.toString();
  const { userId, admin, verifiedEmail, email } = await login({
    username: username ?? "",
    password: password ?? ""
  }) ?? { userId: null, admin: false };
  if (userId == null || username == null) {
    return badRequest({
      fields: { username: username ?? "", password: password ?? "", redirectTo: redirectTo ?? "" },
      formError: "Something is wrong."
    });
  }
  if (!verifiedEmail) {
    await sendEmailConfirmationEmail(email, baseUrl);
  }
  return createUserSession(username, admin, verifiedEmail, redirectTo ?? "/");
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/verifyEmail.tsx
var verifyEmail_exports = {};
__export(verifyEmail_exports, {
  Text: () => Text2,
  action: () => action4,
  default: () => ComponentName2,
  loader: () => loader4
});
var import_react35 = require("@remix-run/react");
var import_server_runtime3 = require("@remix-run/server-runtime");
var import_react36 = __toESM(require("react"));
var import_fa2 = require("react-icons/fa");
var import_styled_components21 = __toESM(require("styled-components"));

// app/routes/authenticate.tsx
var import_react33 = require("@remix-run/react");
var import_react34 = __toESM(require("react"));
var import_styled_components20 = __toESM(require("styled-components"));
var Title5 = import_styled_components20.default.h2`
  color: ${styles.colors.black};
  text-align: center;
  font-size: 1.375rem;
  margin: 2rem 0rem 1rem;
  @media (min-width: 500px) {
    font-size: 2rem;
  }
  @media (min-width: 800px) {
    font-size: 2.3rem;
  }
`;
var TabBar2 = import_styled_components20.default.div`
  margin: 1rem auto;
  width: 95%;
  max-width: 500px;
  justify-content: center;
  align-items: stretch;
  display: flex;
  padding: 0.5rem 0rem;
  border: 1.5px solid ${styles.colors.gray[140]}40;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;
var Separator3 = import_styled_components20.default.div`
  width: 1px;
  background-color: ${styles.colors.gray[50]};
`;
var AuthTabButton2 = import_styled_components20.default.button`
  width: 50%;
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  color: ${styles.colors.gray[110]};
  font-weight: bold;
  text-decoration: none;
`;
var ActiveHighlighter2 = import_styled_components20.default.div`
  position: absolute;
  height: calc(100% - 0.4rem);
  border-radius: 0.25rem;
  width: calc(50% - 0.4rem);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  left: ${(props) => props.position == 0 ? "0px" : "50%"};
  top: 0px;
  margin: 0.2rem;
  background-color: ${styles.colors.action};
  z-index: -1;
`;

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/verifyEmail.tsx
var loader4 = async ({ request }) => {
  const { usernameToVerify } = await requireUsernameToVerify(request);
  return (0, import_server_runtime3.json)({ usernameToVerify });
};
var action4 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const usernameToVerify = getFormItem("usernameToVerify");
  const user = await getUserEmailToResend({ username: usernameToVerify });
  const token = getFormItem("token");
  if (token) {
    const goodEmail = verifyMessage(token.split(":")[0], token.split(":")[1]);
    if (!goodEmail) {
      return badRequest({ msg: "Email verification failed." });
    }
    const user2 = await verifyUserEmail(token.split(":")[0]);
    return createUserSession(user2.username, user2.admin, true, "/doneVerifyingEmail");
  } else if (!!usernameToVerify && !!user && user.verifyEmailTriesLeft > 0) {
    const baseUrl = getBaseUrl(request);
    await sendEmailConfirmationEmail(user.email, baseUrl);
    return (0, import_server_runtime3.json)({ msg: "Another email sent." });
  } else {
    return badRequest({ msg: "Looks like you're out of verification emails." });
  }
};
var Header = import_styled_components21.default.h5`
  font-weight: 600;
  padding: 0 1rem;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;
var Text2 = import_styled_components21.default.p`
  font-weight: 500;
  padding: 0 1rem;
  margin-bottom: ${(props) => props.bottom ? "2rem" : ""};
  font-size: 0.875rem;
`;
function ComponentName2() {
  const [s] = (0, import_react35.useSearchParams)();
  const token = s.get("verifyToken");
  const submit = (0, import_react35.useSubmit)();
  const { usernameToVerify } = (0, import_react35.useLoaderData)();
  const actionData = (0, import_react35.useActionData)();
  const formRef = import_react36.default.useRef(null);
  const [countDown, setCountDown] = import_react36.default.useState(30);
  console.log(countDown);
  import_react36.default.useEffect(() => {
    if (formRef.current) {
      submit(formRef.current);
    }
    const timerId = setInterval(() => {
      if (!token || token == "") {
        setCountDown((countDown2) => countDown2 > 0 ? countDown2 - 1 : countDown2);
      }
    }, 1e3);
    return () => clearInterval(timerId);
  }, []);
  return /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, !token || token == "" ? /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, /* @__PURE__ */ import_react36.default.createElement(Title5, null, "Email Verification - Step 1"), /* @__PURE__ */ import_react36.default.createElement(IconRow, {
    invertColors: true
  }), /* @__PURE__ */ import_react36.default.createElement(AuthWrap, {
    style: { paddingBottom: "2rem" }
  }, /* @__PURE__ */ import_react36.default.createElement(Header, null, "Please confirm your email address."), /* @__PURE__ */ import_react36.default.createElement(Text2, null, "To use your account, you must confirm your email address by clicking a link we sent you there."), /* @__PURE__ */ import_react36.default.createElement(Text2, {
    bottom: true
  }, "Didn't receive anything? Check your spam folder. Or... (", countDown.toString(), "s)"), /* @__PURE__ */ import_react36.default.createElement(import_react35.Form, {
    method: "post"
  }, /* @__PURE__ */ import_react36.default.createElement(IdInput, {
    name: "usernameToVerify",
    value: usernameToVerify
  }), /* @__PURE__ */ import_react36.default.createElement(MainButtonBtn, {
    style: { margin: "0 auto" },
    disabled: countDown > 0,
    onClick: () => {
      setCountDown(30);
    }
  }, "Resend Email", /* @__PURE__ */ import_react36.default.createElement(import_fa2.FaAngleDoubleRight, null)))), (actionData == null ? void 0 : actionData.msg) && /* @__PURE__ */ import_react36.default.createElement("p", null, actionData.msg)) : /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, /* @__PURE__ */ import_react36.default.createElement(Title5, null, "Email Verification - Step 2"), /* @__PURE__ */ import_react36.default.createElement(IconRow, {
    invertColors: true
  }), /* @__PURE__ */ import_react36.default.createElement(AuthWrap, null, /* @__PURE__ */ import_react36.default.createElement(Header, null, "Confirming your email address..."), /* @__PURE__ */ import_react36.default.createElement(Text2, {
    bottom: true
  }, "You will be redirected to Reserveroo in a moment."), /* @__PURE__ */ import_react36.default.createElement(import_react35.Form, {
    method: "post",
    ref: formRef
  }, /* @__PURE__ */ import_react36.default.createElement(IdInput, {
    name: "token",
    value: token
  })))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/pwd/forgot.tsx
var forgot_exports = {};
__export(forgot_exports, {
  action: () => action5,
  default: () => ForgotPassword,
  loader: () => loader5
});
var import_react39 = require("@remix-run/react");
var import_server_runtime5 = require("@remix-run/server-runtime");
var import_fa4 = require("react-icons/fa");
var import_styled_components23 = __toESM(require("styled-components"));

// app/routes/verifyEmail.tsx
var import_react37 = require("@remix-run/react");
var import_server_runtime4 = require("@remix-run/server-runtime");
var import_react38 = __toESM(require("react"));
var import_fa3 = require("react-icons/fa");
var import_styled_components22 = __toESM(require("styled-components"));
var Header2 = import_styled_components22.default.h5`
  font-weight: 600;
  padding: 0 1rem;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;
var Text3 = import_styled_components22.default.p`
  font-weight: 500;
  padding: 0 1rem;
  margin-bottom: ${(props) => props.bottom ? "2rem" : ""};
  font-size: 0.875rem;
`;

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/pwd/forgot.tsx
var action5 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const username = getFormItem("username");
  const user = await getEmailFromUsername({ username });
  if (user == null)
    return badRequest({ msg: "Something went wrong.", fields: { username } });
  console.log(user);
  await sendPwdResetEmail(user == null ? void 0 : user.email, getBaseUrl(request), username);
  return (0, import_server_runtime5.json)({ msg: "You should get an email with the reset link.", fields: { username } });
};
var loader5 = async ({ request }) => {
  return {};
};
var InputWrap = import_styled_components23.default.div`
  padding: 0 1rem;
`;
function ForgotPassword() {
  var _a;
  const a = (0, import_react39.useActionData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title5, null, "Password Reset - Step 1"), /* @__PURE__ */ React.createElement(IconRow, {
    invertColors: true
  }), /* @__PURE__ */ React.createElement(AuthWrap, {
    style: { paddingBottom: "2rem" }
  }, /* @__PURE__ */ React.createElement(Text3, null, "Enter your username. If it exists, we will send a password recovery link to the email address paired with your account."), /* @__PURE__ */ React.createElement(import_react39.Form, {
    method: "post"
  }, (a == null ? void 0 : a.msg) && /* @__PURE__ */ React.createElement("p", null, a == null ? void 0 : a.msg), /* @__PURE__ */ React.createElement(InputWrap, null, /* @__PURE__ */ React.createElement(TextInput, {
    name: "username",
    title: "Username",
    defaultValue: ((_a = a == null ? void 0 : a.fields) == null ? void 0 : _a.username) ?? ""
  })), /* @__PURE__ */ React.createElement(MainButtonBtn, {
    style: { margin: "1.5rem auto 0" }
  }, "Reset Password", /* @__PURE__ */ React.createElement(import_fa4.FaAngleDoubleRight, null)))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/pwd/reset.tsx
var reset_exports = {};
__export(reset_exports, {
  action: () => action6,
  default: () => ForgotPassword2,
  loader: () => loader6
});
var import_react40 = require("@remix-run/react");
var import_server_runtime6 = require("@remix-run/server-runtime");
var import_react41 = __toESM(require("react"));
var import_fa5 = require("react-icons/fa");
var import_styled_components24 = __toESM(require("styled-components"));
var action6 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const username = getFormItem("token").split(":")[0];
  const signature = getFormItem("token").split(":")[1];
  const password = getFormItem("password");
  const goodSource = verifyMessage(username, signature);
  if (!goodSource) {
    return (0, import_server_runtime6.json)({ msg: "Something went wrong. Are you a sneaky hacker? >:(" });
  }
  const passwordHash = await generateHashAndSalt(password);
  const user = await changeUserPassword({ username, passwordHash });
  return (0, import_server_runtime6.redirect)("/authenticate");
};
var loader6 = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token || token == "") {
    return (0, import_server_runtime6.redirect)("/authenticate");
  }
  return {};
};
var InputWrap2 = import_styled_components24.default.div`
  padding: 0 1rem;
`;
var Spacer = import_styled_components24.default.div`
  height: 1rem;
`;
function ForgotPassword2() {
  const a = (0, import_react40.useActionData)();
  const [searchParams] = (0, import_react40.useSearchParams)();
  const [pwd, setPwd] = (0, import_react41.useState)("");
  const [cpwd, setCPwd] = (0, import_react41.useState)("");
  const s = Math.max(checkPasswordStrength(pwd), checkPasswordStrength(cpwd));
  const pwdString = s <= 3 ? "Very weak" : s <= 6 ? "Weak" : s <= 9 ? "Moderate" : s < 12 ? "Strong" : "Very Strong";
  const token = searchParams.get("token") ?? "";
  return /* @__PURE__ */ import_react41.default.createElement("div", null, token && /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null, /* @__PURE__ */ import_react41.default.createElement(Title5, null, "Password Reset - Step 2"), /* @__PURE__ */ import_react41.default.createElement(IconRow, {
    invertColors: true
  }), /* @__PURE__ */ import_react41.default.createElement(AuthWrap, {
    style: { paddingBottom: "2rem" }
  }, /* @__PURE__ */ import_react41.default.createElement(Text3, null, "Enter your new password below."), /* @__PURE__ */ import_react41.default.createElement(Spacer, null), /* @__PURE__ */ import_react41.default.createElement(import_react40.Form, {
    method: "post"
  }, (a == null ? void 0 : a.msg) && /* @__PURE__ */ import_react41.default.createElement("p", null, a == null ? void 0 : a.msg), /* @__PURE__ */ import_react41.default.createElement(IdInput, {
    name: "token",
    value: token
  }), /* @__PURE__ */ import_react41.default.createElement(InputWrap2, null, /* @__PURE__ */ import_react41.default.createElement(TextInput, {
    setValue: setPwd,
    title: "Password",
    password: true,
    name: "password",
    defaultValue: ""
  }), /* @__PURE__ */ import_react41.default.createElement(Spacer, null), /* @__PURE__ */ import_react41.default.createElement(TextInput, {
    setValue: setCPwd,
    title: "Confirm Password",
    password: true,
    name: "confirmPassword",
    defaultValue: ""
  }), /* @__PURE__ */ import_react41.default.createElement(Spacer, null), /* @__PURE__ */ import_react41.default.createElement(BarBack, null, /* @__PURE__ */ import_react41.default.createElement(Bar, {
    width: s / 12 * 100
  })), /* @__PURE__ */ import_react41.default.createElement(Spacer, null), s > 0 && pwd == cpwd && /* @__PURE__ */ import_react41.default.createElement(PwdInfo, null, "Your password is ", /* @__PURE__ */ import_react41.default.createElement("strong", null, pwdString)), pwd.length == 0 && cpwd.length == 0 && /* @__PURE__ */ import_react41.default.createElement(PwdInfo, null, "Choose a strong password."), pwd != cpwd && /* @__PURE__ */ import_react41.default.createElement(PwdWarn, null, "Your passwords don't match.")), /* @__PURE__ */ import_react41.default.createElement(MainButtonBtn, {
    disabled: pwd != cpwd,
    style: { margin: "1.5rem auto 0" }
  }, "Reset Password", /* @__PURE__ */ import_react41.default.createElement(import_fa5.FaAngleDoubleRight, null))))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/$placeId.tsx
var placeId_exports = {};
__export(placeId_exports, {
  default: () => PlaceDetail,
  loader: () => loader7
});
var import_react42 = require("@remix-run/react");
var import_server_runtime7 = require("@remix-run/server-runtime");
var import_react43 = __toESM(require("react"));
var import_styled_components25 = __toESM(require("styled-components"));

// app/models/place.server.ts
var getPlace = async ({ id }) => await prisma.place.findFirst({
  where: { id },
  include: {
    reservables: {
      include: {
        ReservableType: {
          include: {
            multiLangName: true
          }
        }
      }
    },
    openingTimes: true,
    tags: {
      include: {
        multiLangName: true,
        multiLangDesc: true
      }
    },
    categories: {
      include: {
        multiLangName: true
      }
    },
    Location: {
      include: {
        multiLangCountry: true,
        multiLangCity: true
      }
    }
  }
});
var getPlaceWithReservations = async ({ id }) => await prisma.place.findFirst({
  where: { id },
  include: {
    reservables: {
      include: {
        reservations: true,
        ReservableType: {
          include: {
            multiLangName: true
          }
        }
      }
    },
    openingTimes: true
  }
});
var getPlaceList = async ({ name: nameFragment, cityCountry, tagIds, catIds }) => await prisma.place.findMany({
  where: {
    AND: [{
      name: {
        contains: nameFragment,
        mode: "insensitive"
      }
    }, {
      hidden: false
    }, {
      Location: {
        cityCountry
      }
    }, {
      OR: tagIds == null ? void 0 : tagIds.map((t) => ({
        tags: {
          some: {
            id: t
          }
        }
      }))
    }, {
      OR: catIds == null ? void 0 : catIds.map((c) => ({
        categories: {
          some: {
            id: c
          }
        }
      }))
    }]
  },
  include: {
    openingTimes: true,
    company: true,
    reservables: {
      include: {
        ReservableType: {
          include: {
            multiLangName: true
          }
        }
      }
    },
    tags: {
      include: {
        multiLangDesc: true,
        multiLangName: true
      }
    },
    categories: {
      include: {
        multiLangName: true
      }
    },
    Location: {
      include: {
        multiLangCountry: true,
        multiLangCity: true
      }
    }
  }
});
var getNewPlaces = async () => await prisma.place.findMany({
  orderBy: [{
    createdAt: "desc"
  }],
  take: 6,
  include: {
    openingTimes: true,
    company: true,
    reservables: {
      include: {
        ReservableType: {
          include: {
            multiLangName: true
          }
        }
      }
    },
    tags: {
      include: {
        multiLangDesc: true,
        multiLangName: true
      }
    },
    categories: {
      include: {
        multiLangName: true
      }
    },
    Location: {
      include: {
        multiLangCountry: true,
        multiLangCity: true
      }
    }
  }
});
var getAllPlaces = async () => await prisma.place.findMany({
  include: {
    company: true,
    reservables: true
  }
});
var createPlace = async ({ name: name3, companyId }) => await prisma.place.create({
  data: {
    name: name3,
    companyId
  }
});
var updatePlace = async ({
  id,
  name: name3,
  companyId,
  hidden,
  addedTagIds,
  removedTagIds,
  addedCategoryIds,
  removedCategoryIds,
  locationId,
  description,
  street,
  city,
  postCode,
  howToGetThere
}) => await prisma.place.update({
  where: {
    id
  },
  data: {
    tags: {
      connect: addedTagIds.map((t) => ({ id: t })),
      disconnect: removedTagIds.map((t) => ({ id: t }))
    },
    categories: {
      connect: addedCategoryIds.map((c) => ({ id: c })),
      disconnect: removedCategoryIds.map((c) => ({ id: c }))
    },
    locationId: locationId == "" ? null : locationId,
    name: name3,
    companyId,
    hidden,
    description,
    street,
    city,
    postCode,
    howToGetThere
  }
});
var updatePlaceProfilePic = async ({ id, profilePicUrl }) => await prisma.place.update({
  where: {
    id
  },
  data: {
    profilePicUrl
  }
});
var addToPlaceGalleryPics = async ({ id, galleryPicUrls }) => {
  const place = await prisma.place.findUnique({ where: { id } });
  return await prisma.place.update({
    where: {
      id
    },
    data: {
      galleryPicUrls: place == null ? void 0 : place.galleryPicUrls.concat(galleryPicUrls)
    }
  });
};
var removeFromPlaceGalleryPics = async ({ id, galleryPicUrls }) => {
  const place = await prisma.place.findUnique({ where: { id } });
  return await prisma.place.update({
    where: {
      id
    },
    data: {
      galleryPicUrls: place == null ? void 0 : place.galleryPicUrls.filter((p1) => !galleryPicUrls.find((p2) => p1 == p2))
    }
  });
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/$placeId.tsx
var loader7 = async ({ params }) => {
  const place = await getPlace({ id: params.placeId ?? "" });
  return (0, import_server_runtime7.json)({ place, imageUrl: place == null ? void 0 : place.profilePicUrl });
};
var Banner = import_styled_components25.default.div`
  padding: 2rem 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${styles.colors.gray[5]};
`;
var PlaceInfoWrap2 = import_styled_components25.default.div`
  display: flex;
  justify-content: space-between;
`;
var PlaceName2 = (0, import_styled_components25.default)(import_react42.Link)`
  color: ${styles.colors.black};
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
  @media (max-width: 600px) {
    text-align: center;
  }
`;
var LocationInfoWrap = import_styled_components25.default.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
var LocationText = import_styled_components25.default.p`
  margin: 0px;
  font-size: 1rem;
  font-weight: 500;
`;
var OuterFlex = import_styled_components25.default.div`
  display: grid;
  grid-template-columns: 9rem 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  max-width: 938px;
  width: 100%;
  @media (max-width: 600px) {
    grid-template-columns: auto;
    justify-items: center;
    grid-template-rows: repeat(2, auto);
    gap: 1rem;
  }
`;
var Flex3 = import_styled_components25.default.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
var Time2 = import_styled_components25.default.p`
  margin: 0px;
  font-size: 1rem;
  font-weight: 500;
`;
var GeneralInfoWrap = import_styled_components25.default.div`
  display: grid;
  gap: 0.8rem;
  align-items: stretch;
  grid-template-rows: repeat(3, auto);
`;
var FlexApart2 = import_styled_components25.default.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  row-gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;
function PlaceDetail() {
  const { place, imageUrl } = (0, import_react42.useLoaderData)();
  const [position, setPosition] = import_react43.default.useState(0);
  return /* @__PURE__ */ import_react43.default.createElement(import_react43.default.Fragment, null, place ? /* @__PURE__ */ import_react43.default.createElement(Banner, null, /* @__PURE__ */ import_react43.default.createElement(OuterFlex, null, /* @__PURE__ */ import_react43.default.createElement(PlaceImage, {
    shape: "circle",
    imageUrl
  }), /* @__PURE__ */ import_react43.default.createElement(PlaceInfoWrap2, null, /* @__PURE__ */ import_react43.default.createElement(GeneralInfoWrap, null, /* @__PURE__ */ import_react43.default.createElement(PlaceName2, {
    to: `/${place.id}`
  }, place.name), /* @__PURE__ */ import_react43.default.createElement(FlexApart2, null, /* @__PURE__ */ import_react43.default.createElement(LocationInfoWrap, null, /* @__PURE__ */ import_react43.default.createElement(Location_default, {
    height: "1rem"
  }), /* @__PURE__ */ import_react43.default.createElement(LocationText, null, place.street, ", ", place.city)), /* @__PURE__ */ import_react43.default.createElement(Flex3, null, /* @__PURE__ */ import_react43.default.createElement(Clock_default, {
    height: "1rem"
  }), /* @__PURE__ */ import_react43.default.createElement(Time2, null, getNextImportantTime(place)))), /* @__PURE__ */ import_react43.default.createElement(FacilitiesIndicator, {
    reservables: place.reservables
  }), /* @__PURE__ */ import_react43.default.createElement(TagList, {
    tags: place.tags
  }))))) : /* @__PURE__ */ import_react43.default.createElement("p", null, "An error has occured."), /* @__PURE__ */ import_react43.default.createElement(import_react42.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/$placeId/reserve.tsx
var reserve_exports = {};
__export(reserve_exports, {
  action: () => action7,
  default: () => ReservationElement,
  loader: () => loader8
});
var import_react47 = require("@remix-run/react");
var import_server_runtime8 = require("@remix-run/server-runtime");
var import_react48 = __toESM(require("react"));
var import_styled_components29 = __toESM(require("styled-components"));

// app/components/inputs/DateInput.tsx
var import_react44 = __toESM(require("react"));
var import_styled_components26 = __toESM(require("styled-components"));

// app/assets/icons/AngleLeft.tsx
var AngleLeftIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 256 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z",
  fill: props.fill ?? styles.colors.black
}));
var AngleLeft_default = AngleLeftIcon;

// app/assets/icons/Calendar.tsx
var CalendarIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 448 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z",
  fill: props.fill ?? styles.colors.black
}));
var Calendar_default = CalendarIcon;

// app/components/inputs/DateInput.tsx
var DateInputField = import_styled_components26.default.input`
  font-size: 0.8rem;
  line-height: 2rem;
  padding: 0rem 1rem;
  border: 1.5px solid ${styles.colors.gray[30]};
  border-radius: 0.3rem;
  outline: none;
  width: 5ch;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
  }
`;
var Calendar = import_styled_components26.default.div`
  width: 15rem;
  height: 15rem;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 0;
  margin-top: 0.3rem;
  background-color: ${styles.colors.white};
  border: 1px solid ${styles.colors.gray[140]}40;
  box-shadow: ${styles.shadows[0]};
  border-radius: 0.5rem;
  z-index: 6;
  @media(max-width: 500px) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
var Header3 = import_styled_components26.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0rem 0.1rem;
  gap: 0.4rem;
`;
var Body3 = import_styled_components26.default.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
`;
var Button = import_styled_components26.default.button`
  border-radius: 100%;
  height: 2rem;
  width: 2rem;
  border: none;
  cursor: pointer;
  color: ${(props) => props.selected ? styles.colors.white : styles.colors.black};
  &:disabled {
    color: ${styles.colors.gray[60]};
  }
  &:hover {
    background-color: ${(props) => props.selected ? styles.colors.primary : styles.colors.gray[20]};
  }
  background-color: ${(props) => props.selected ? styles.colors.primary : styles.colors.white};
`;
var getMaxDayOfMonth = (year, month) => month === 1 && year % 400 === 0 ? 29 : month === 1 && year % 100 === 0 ? 28 : month === 1 && year % 4 === 0 ? 29 : [3, 5, 8, 10].includes(month) ? 30 : 31;
var getDateFromParts = (year, month, date) => `${year == null ? void 0 : year.toString()}-${month < 9 ? "0" : ""}${(month + 1).toString()}-${date < 10 ? "0" : ""}${date == null ? void 0 : date.toString()}`;
var getYearMonthFromValue = (str) => ({ year: parseInt(str.split("-")[0]), month: parseInt(str.split("-")[1]) - 1 });
var Wrap11 = import_styled_components26.default.button`
  padding: 0.5rem 0.8rem;
  display: flex;
  gap: 1rem;
  margin: 0;
  cursor: pointer;
  align-items: center;
  border: 1.5px solid ${styles.colors.gray[140]}40;
  border-radius: 0.5rem;
  background-color: ${styles.colors.white};
`;
var DateDisplay = import_styled_components26.default.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
`;
var Month = import_styled_components26.default.p`
  margin: 0;
  font-size: 0.8rem;
`;
var HeaderButton = import_styled_components26.default.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  border-radius: 0.3rem;
  &>svg {
    height: 1.1rem;
  }
  &:hover {
    background-color: ${styles.colors.gray[20]};
  }
`;
var Overlay3 = import_styled_components26.default.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;
var RelativeWrapper = import_styled_components26.default.div`
  position: relative;
`;
var DayButton = ({ disabled, date, selected, onClick }) => /* @__PURE__ */ import_react44.default.createElement(Button, {
  disabled,
  selected,
  onClick: (e) => {
    e.preventDefault();
    onClick();
  }
}, date.toString());
var DateInput = ({ disablePast, name: name3, defaultValue, title, onChange }) => {
  const [value, setValue] = import_react44.default.useState(getInputDateFromString(defaultValue));
  const [{ year, month }, setYearMonth] = import_react44.default.useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
  const [date, setDate] = import_react44.default.useState(new Date().getDate());
  const [showCalendar, setShowCalendar] = import_react44.default.useState(false);
  const { translations: l } = useLangs();
  import_react44.default.useEffect(() => {
    setValue(date ? getDateFromParts(year, month, date) : "");
    onChange(date ? new Date(year, month, date) : null);
  }, [date]);
  const startPadding = new Date(year, month, 1).getDay() == 0 ? 6 : new Date(year, month, 1).getDay() - 1;
  const maxDayOfPreviousMonth = getMaxDayOfMonth(month > 0 ? year : year - 1, month > 0 ? month - 1 : month + 11);
  const days = [...Array(getMaxDayOfMonth(year, month)).keys()];
  const endPadding = 7 - (days.length + startPadding) % 7;
  return /* @__PURE__ */ import_react44.default.createElement(RelativeWrapper, null, title && /* @__PURE__ */ import_react44.default.createElement("label", null, title), /* @__PURE__ */ import_react44.default.createElement(Wrap11, {
    onClick: (e) => {
      e.preventDefault();
      setShowCalendar(!showCalendar);
    }
  }, /* @__PURE__ */ import_react44.default.createElement(Calendar_default, {
    height: "1rem"
  }), /* @__PURE__ */ import_react44.default.createElement(DateDisplay, null, getStringDateValue(new Date(value)))), showCalendar && /* @__PURE__ */ import_react44.default.createElement(import_react44.default.Fragment, null, /* @__PURE__ */ import_react44.default.createElement(Overlay3, {
    onClick: () => {
      setShowCalendar(false);
    }
  }), /* @__PURE__ */ import_react44.default.createElement(Calendar, null, /* @__PURE__ */ import_react44.default.createElement(Header3, null, /* @__PURE__ */ import_react44.default.createElement(HeaderButton, {
    onClick: (e) => {
      e.preventDefault();
      setYearMonth({
        year: month == 0 ? year - 1 : year,
        month: month == 0 ? 11 : month - 1
      });
    }
  }, /* @__PURE__ */ import_react44.default.createElement(AngleLeft_default, null)), /* @__PURE__ */ import_react44.default.createElement(Month, null, l.months[month]), /* @__PURE__ */ import_react44.default.createElement(HeaderButton, {
    onClick: (e) => {
      e.preventDefault();
      setYearMonth({
        year: month == 11 ? year + 1 : year,
        month: month == 11 ? 0 : month + 1
      });
    }
  }, /* @__PURE__ */ import_react44.default.createElement(AngleRight_default, null))), /* @__PURE__ */ import_react44.default.createElement(Body3, null, [...Array(startPadding).keys()].map((_, i) => maxDayOfPreviousMonth - i).reverse().map((d) => /* @__PURE__ */ import_react44.default.createElement(DayButton, {
    disabled: true,
    key: d,
    onClick: () => {
      setYearMonth({
        year,
        month: month - 1
      });
      setDate(d);
      setShowCalendar(false);
    },
    date: d
  })), days.map((d) => /* @__PURE__ */ import_react44.default.createElement(DayButton, {
    key: d + 32,
    disabled: disablePast && (new Date().getDate() > d + 1 && new Date().getMonth() == month) || new Date().getMonth() > month && new Date().getFullYear() == year || new Date().getFullYear() > year,
    selected: d + 1 == date && getYearMonthFromValue(value).month == month && getYearMonthFromValue(value).year == year,
    date: d + 1,
    onClick: () => {
      setDate(d + 1);
      setShowCalendar(false);
    }
  })), [...Array(endPadding).keys()].map((d) => /* @__PURE__ */ import_react44.default.createElement(DayButton, {
    disabled: true,
    key: d + 64,
    date: d + 1,
    onClick: () => {
      setDate(d + 1);
      setYearMonth({
        year,
        month: month + 1
      });
      setShowCalendar(false);
    }
  }))))), /* @__PURE__ */ import_react44.default.createElement("input", {
    name: name3,
    type: "date",
    value,
    readOnly: true,
    hidden: true
  }));
};

// app/components/reservable-times.tsx
var import_react45 = __toESM(require("react"));
var import_styled_components27 = __toESM(require("styled-components"));
var ReservableTimes = ({ reservationBackupName, setResList, backup = false, reservationIdName, defaultReservationGroup, reservableIdName, reservables, date, openingTime, startName, endName }) => {
  const { lang } = useLangs();
  const reservableGroups = [];
  reservables.forEach((r) => {
    if (!r.ReservableType)
      return;
    let rg = reservableGroups.find((rgx) => rgx.typeId == r.ReservableType.id);
    if (rg != null) {
      rg.reservables.push(r);
    } else {
      reservableGroups.push({
        typeId: r.ReservableType.id,
        typeName: r.ReservableType.multiLangName ? r.ReservableType.multiLangName[lang] : "",
        reservables: [r]
      });
    }
  });
  console.log(reservableGroups);
  return /* @__PURE__ */ import_react45.default.createElement(GroupWrap, null, reservableGroups.map((rg) => /* @__PURE__ */ import_react45.default.createElement(ReservableGroupSection, {
    key: rg.typeId,
    reservableGroup: rg,
    date,
    openingTime,
    startName,
    endName,
    backup,
    reservableIdName,
    defaultReservation: void 0,
    defaultReservationGroup,
    reservationIdName,
    reservationBackupName,
    setResList
  })));
};
var TypeName = import_styled_components27.default.h3`
  align-self: end;
  text-align: end;
  position: sticky;
  left: -30%;
  font-weight: 600;
  padding: 1.6rem 1rem 0.5rem;
  margin-bottom: 0;
  margin-top: 0;
  background-color: ${styles.colors.gray[5]};
`;
var Times = import_styled_components27.default.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 1.6rem 1rem 0.5rem;
  background-color: ${styles.colors.primary_background};
  & p {
    width: 44px;
    text-align: center;
    margin: 0;
  }
`;
var GroupWrap = import_styled_components27.default.div`
  display: grid;
  width: 100%;
  overflow-x: scroll;
  grid-template-columns: max-content 1fr;
  position: relative;
`;
var ReservableGroupSection = ({
  reservableGroup,
  date,
  openingTime,
  startName,
  endName,
  reservableIdName,
  defaultReservation,
  defaultReservationGroup,
  reservationIdName,
  backup,
  reservationBackupName,
  setResList
}) => {
  const openMinutes = getDiffBetweenTwoDates(openingTime.close, openingTime.open);
  const openSinceMinutes = new Date(openingTime.open).getMinutes() + new Date(openingTime.open).getHours() * 60;
  const minMin = reservableGroup.reservables[0].minimumReservationTime;
  const slotCapacity = reservableGroup.reservables[0].reservationsPerSlot;
  const sections = Math.floor(openMinutes / Math.max(1, minMin));
  const timeTitle = [...Array(Math.floor(sections / 2)).keys()].map((s) => {
    const currentMins = openSinceMinutes + openMinutes / sections * s * 2;
    return getStringTimeValue(new Date(0, 0, 0, Math.floor(currentMins / 60), currentMins % 60));
  });
  return /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, /* @__PURE__ */ import_react45.default.createElement(TypeName, null, reservableGroup.typeName), /* @__PURE__ */ import_react45.default.createElement(Times, null, timeTitle.map((t, i) => /* @__PURE__ */ import_react45.default.createElement("p", {
    key: i
  }, t))), reservableGroup.reservables.map((r) => /* @__PURE__ */ import_react45.default.createElement(ReservableSection, {
    key: r.id,
    reservable: r,
    date,
    openingTime,
    startName,
    endName,
    backup,
    reservableIdName,
    defaultReservation,
    reservationIdName,
    defaultReservationGroup,
    reservationBackupName,
    setResList
  })));
};
var getTotalMinutes = (time) => time.hour * 60 + time.minute;
var getTimeOfTotalMinutes = (minutes) => ({
  hour: Math.floor(minutes / 60),
  minute: minutes % 60
});
var doSectionsOverlap = (section1, section2) => {
  return section2 != null && !(getTotalMinutes(section1.end) <= getTotalMinutes(section2.start) || getTotalMinutes(section2.end) <= getTotalMinutes(section1.start));
};
var getDiffBetweenTwoDates = (close, open) => {
  const millis = new Date(close).getTime() - new Date(open).getTime();
  return millis / 1e3 / 60;
};
var getTimeSectionOfReservation = (reservation) => {
  return {
    start: {
      hour: new Date(reservation.start).getHours(),
      minute: new Date(reservation.start).getMinutes()
    },
    end: {
      hour: new Date(reservation.end).getHours(),
      minute: new Date(reservation.end).getMinutes()
    }
  };
};
var doDaysMatch = (date1, date2, date3) => {
  return new Date(date1).getFullYear() === new Date(date2).getFullYear() && new Date(date1).getFullYear() === new Date(date3).getFullYear() && new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getMonth() === new Date(date3).getMonth() && new Date(date1).getDate() === new Date(date2).getDate() && new Date(date1).getDate() === new Date(date3).getDate();
};
var Section = import_styled_components27.default.button`
  border: none;
  border-radius: 0.25rem;
  height: 1.5rem;
  flex-shrink: 0;
  width: 36px;
  cursor: pointer;
  transition: box-shadow 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    box-shadow: ${styles.shadows[2]};
  }
  background-color: ${(props) => props.selected ? styles.colors.action : props.taken ? styles.colors.busy : styles.colors.gray[70]};
`;
var SectionWrap = import_styled_components27.default.div`
  display: flex;
  background-color: ${styles.colors.primary_background};
  gap: 2px;
  padding: 0.5rem 2rem 0.5rem 0;
  padding-left: 2.375rem;
`;
var Title6 = import_styled_components27.default.p`
  text-align: end;
  position: sticky;
  left: -30%;
  padding: 0.5rem 1rem;
  align-self: stretch;

  margin: 0;
  font-weight: 500;
  background-color: ${styles.colors.gray[5]};
`;
var CannotReserve = import_styled_components27.default.div`
  margin: 0;
  font-weight: 500;
  font-size: 0.8rem;
  height: 1.5rem;
`;
var ReservableSection = ({ defaultReservationGroup, setResList, reservationBackupName, backup, reservationIdName, defaultReservation, reservableIdName, reservable, date, openingTime, startName, endName }) => {
  const openMinutes = getDiffBetweenTwoDates(openingTime.close, openingTime.open);
  const openSinceMinutes = new Date(openingTime.open).getMinutes() + new Date(openingTime.open).getHours() * 60;
  const minMin = reservable.minimumReservationTime;
  const sections = Math.floor(openMinutes / Math.max(1, minMin));
  const timeSections = [...Array(sections).keys()].map((s) => ({
    start: { minute: Math.round((s * minMin + openSinceMinutes) % 60), hour: Math.floor((s * minMin + openSinceMinutes) / 60) },
    end: { minute: Math.round(((s + 1) * minMin + openSinceMinutes) % 60), hour: Math.floor(((s + 1) * minMin + openSinceMinutes) / 60) }
  }));
  const [selectedRange, setSelectedRange] = import_react45.default.useState(defaultReservation ? getTimeSectionOfReservation(defaultReservation) : null);
  const [selectedDate, setSelectedDate] = import_react45.default.useState(date);
  const maxReservableDate = new Date();
  maxReservableDate.setDate(maxReservableDate.getDate() + reservable.reservableDaysAhead);
  return /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, /* @__PURE__ */ import_react45.default.createElement(Title6, null, reservable.name), /* @__PURE__ */ import_react45.default.createElement(SectionWrap, null, date.getTime() > maxReservableDate.getTime() ? /* @__PURE__ */ import_react45.default.createElement(CannotReserve, null, "You cannot yet reserve this far ahead.") : timeSections.map((s) => /* @__PURE__ */ import_react45.default.createElement(Section, {
    taken: reservable.reservations.filter((r) => doDaysMatch(date, r.start, r.end) && doSectionsOverlap(getTimeSectionOfReservation(r), s) && !(defaultReservationGroup == null ? void 0 : defaultReservationGroup.reservations.find((dr) => dr.id == r.id)) && r.status != 3 /* Cancelled */).length >= reservable.reservationsPerSlot,
    key: getTotalMinutes(s.start),
    selected: selectedRange != null && areDatesEqual(date, selectedDate) && getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.start) && getTotalMinutes(s.start) < getTotalMinutes(selectedRange.end),
    onClick: (e) => {
      let newRange = null;
      if (selectedRange == null || date != selectedDate) {
        newRange = s;
      } else if (getTotalMinutes(s.start) >= getTotalMinutes(selectedRange.end)) {
        newRange = { start: selectedRange.start, end: s.end };
      } else if (getTotalMinutes(s.start) < getTotalMinutes(selectedRange.start)) {
        newRange = { start: s.start, end: getTimeOfTotalMinutes(getTotalMinutes(selectedRange.start) + minMin) };
      } else if (getTotalMinutes(selectedRange.start) == getTotalMinutes(s.start) && getTotalMinutes(s.end) == getTotalMinutes(selectedRange.end)) {
        newRange = null;
      } else if (getTotalMinutes(selectedRange.start) <= getTotalMinutes(s.start) && getTotalMinutes(s.start) <= getTotalMinutes(selectedRange.end)) {
        newRange = { start: selectedRange.start, end: s.end };
      }
      const overlap = reservable.reservations.filter((r) => doDaysMatch(date, r.start, r.end) && doSectionsOverlap(getTimeSectionOfReservation(r), s) && !(defaultReservationGroup == null ? void 0 : defaultReservationGroup.reservations.find((dr) => dr.id == r.id)) && r.status != 3 /* Cancelled */).length >= reservable.reservationsPerSlot;
      setSelectedRange(overlap ? selectedRange : newRange);
      setSelectedDate(overlap ? selectedDate : date);
      setResList((resList) => {
        const r = overlap ? selectedRange : newRange;
        const d = overlap ? selectedDate : date;
        const startDate = r ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.start.hour, r.start.minute) : null;
        const endDate = r ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), r.end.hour, r.end.minute) : null;
        const obj = ((startDate == null ? void 0 : startDate.getTime()) ?? 0) < ((endDate == null ? void 0 : endDate.getTime()) ?? 0) ? { reservableId: reservable.id, startTime: startDate, endTime: endDate, isBackup: backup ?? false } : null;
        const arr = resList.filter((rx) => rx.reservableId != reservable.id || rx.isBackup != backup);
        if (obj != null)
          arr.push(obj);
        return arr;
      });
      e.preventDefault();
    }
  })), selectedRange && /* @__PURE__ */ import_react45.default.createElement(IdInput, {
    name: reservationBackupName,
    value: backup ? "1" : "0"
  }), selectedRange && /* @__PURE__ */ import_react45.default.createElement(IdInput, {
    name: reservationIdName,
    value: defaultReservation ? defaultReservation.id : "-1"
  }), selectedRange && /* @__PURE__ */ import_react45.default.createElement("input", {
    hidden: true,
    readOnly: true,
    name: startName,
    type: "datetime-local",
    value: selectedRange ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.start.hour, selectedRange.start.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ""
  }), selectedRange && /* @__PURE__ */ import_react45.default.createElement("input", {
    hidden: true,
    readOnly: true,
    name: endName,
    type: "datetime-local",
    value: selectedRange ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedRange.end.hour, selectedRange.end.minute - new Date().getTimezoneOffset()).toISOString().slice(0, 16) : ""
  }), selectedRange && /* @__PURE__ */ import_react45.default.createElement(IdInput, {
    name: reservableIdName,
    value: reservable.id
  })));
};

// app/components/reserve-confirmation-dialog.tsx
var import_react46 = __toESM(require("react"));
var import_styled_components28 = __toESM(require("styled-components"));
var Wrap12 = import_styled_components28.default.div`
  position: fixed;
  visibility: ${(props) => props.hidden ? "hidden" : "visible"};
  transition: opacity 0.15s ease-in-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(0.9);
  opacity: 0;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Window = import_styled_components28.default.div`
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[0]};
  width: 968px;
  display: flex;
  max-width: 100%;
  border-radius: 1rem;
  @media (max-width: 650px) {
    width: 100%;
    border-radius: 0;
  }
  flex-direction: column;
  gap: 1.3rem;
  padding: 1.5rem;
  z-index: 8;
  position: relative;
`;
var Backdrop2 = import_styled_components28.default.div`
  position: fixed;
  z-index: 7;
  display: ${(props) => props.hidden ? "none" : ""};
  background-color: ${styles.colors.black}40;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: scale(150%);
  width: 100vw;
  height: 100vh;
  align-items: center;
`;
var Title7 = import_styled_components28.default.h2`
  margin: 0px;
  font-size: 1.375rem;
  font-weight: 600;
`;
var Text4 = import_styled_components28.default.p`
  margin: 0px;
  font-weight: 500;
  font-size: 0.875rem;
`;
var ButtonRow = import_styled_components28.default.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
var SlotList = import_styled_components28.default.div`
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 500px) {
    border-radius: 0.5rem;
  }
  gap: 1.5rem;
  background-color: ${styles.colors.primary};
`;
var BackupSlotList = (0, import_styled_components28.default)(SlotList)`
  background-color: ${styles.colors.gray[5]};
`;
var ResE = import_styled_components28.default.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
var SlotListTitle = import_styled_components28.default.div`
  font-size: 16px;
  font-weight: 600;
`;
var WhiteSlotListTitle = (0, import_styled_components28.default)(SlotListTitle)`
  color: ${styles.colors.white};
`;
var BackupSlotText = import_styled_components28.default.p`

`;
var SlotText = (0, import_styled_components28.default)(BackupSlotText)`
  color: ${styles.colors.white};  
`;
var FlexSL = import_styled_components28.default.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.4rem;
  flex-wrap: wrap;
  & > p {
    margin: 0;
  }
`;
var ReserveConfirmationDialog = ({ subHeaderText, reservables, resList, hidden, title, backupTitle, backupText1, backupText2, confirmText, cancelText, onConfirm, close }) => {
  const wrap = import_react46.default.useRef(null);
  import_react46.default.useEffect(() => {
    setTimeout(() => {
      if (wrap.current) {
        wrap.current.style.opacity = hidden ? "0" : "1";
        wrap.current.style.transform = hidden ? "scale(0.9)" : "scale(1)";
      }
    }, 100);
  }, [hidden]);
  return /* @__PURE__ */ import_react46.default.createElement(Wrap12, {
    hidden,
    ref: wrap
  }, /* @__PURE__ */ import_react46.default.createElement(Backdrop2, {
    onClick: close
  }), /* @__PURE__ */ import_react46.default.createElement(Window, null, /* @__PURE__ */ import_react46.default.createElement(Title7, null, title), /* @__PURE__ */ import_react46.default.createElement(Text4, null, subHeaderText), resList.filter((r) => !r.isBackup).length > 0 && /* @__PURE__ */ import_react46.default.createElement(SlotList, null, /* @__PURE__ */ import_react46.default.createElement(WhiteSlotListTitle, null, resList.filter((r) => r.isBackup).length > 0 ? `Preferred timeslot${resList.filter((r) => !r.isBackup).length > 1 ? "s" : ""}` : `Picked timeslot${resList.filter((r) => !r.isBackup).length > 1 ? "s" : ""}`), resList.filter((r) => !r.isBackup).map((r) => {
    var _a;
    return r.startTime && r.endTime && /* @__PURE__ */ import_react46.default.createElement(ResE, null, /* @__PURE__ */ import_react46.default.createElement(Indicator, {
      style: { padding: "0.5rem", whiteSpace: "nowrap" }
    }, (_a = reservables.find((x) => x.id == r.reservableId)) == null ? void 0 : _a.name), /* @__PURE__ */ import_react46.default.createElement(FlexSL, null, /* @__PURE__ */ import_react46.default.createElement(SlotText, null, "Date: ", getStringDateValue(r.startTime)), /* @__PURE__ */ import_react46.default.createElement(SlotText, null, "Time: ", getStringTimeValue(r.startTime), " - ", getStringTimeValue(new Date(r.endTime)))));
  })), resList.filter((r) => r.isBackup).length > 0 && /* @__PURE__ */ import_react46.default.createElement(BackupSlotList, null, /* @__PURE__ */ import_react46.default.createElement(SlotListTitle, null, "Backup timeslots"), resList.filter((r) => r.isBackup).map((r) => {
    var _a;
    return r.startTime && r.endTime && /* @__PURE__ */ import_react46.default.createElement(ResE, null, /* @__PURE__ */ import_react46.default.createElement(Indicator, {
      style: { padding: "0.5rem" }
    }, (_a = reservables.find((x) => x.id == r.reservableId)) == null ? void 0 : _a.name), /* @__PURE__ */ import_react46.default.createElement(FlexSL, null, /* @__PURE__ */ import_react46.default.createElement(BackupSlotText, null, "Date: ", getStringDateValue(r.startTime)), /* @__PURE__ */ import_react46.default.createElement(BackupSlotText, null, "Time: ", getStringTimeValue(r.startTime), " - ", getStringTimeValue(new Date(r.endTime)))));
  })), /* @__PURE__ */ import_react46.default.createElement(Title7, null, backupTitle), /* @__PURE__ */ import_react46.default.createElement(Text4, null, backupText1), /* @__PURE__ */ import_react46.default.createElement(Text4, null, backupText2), /* @__PURE__ */ import_react46.default.createElement(ButtonRow, null, /* @__PURE__ */ import_react46.default.createElement(SecondaryButtonBtn, {
    onClick: (e) => {
      e.preventDefault();
      close();
    }
  }, cancelText), /* @__PURE__ */ import_react46.default.createElement(MainButtonBtn, {
    onClick: (e) => {
      onConfirm();
      close();
      e.preventDefault();
    }
  }, confirmText))));
};

// app/models/reservation.server.ts
var createReservation = async ({ backup, reservationGroupId, reservableId, start, end }) => await prisma.reservation.create({
  data: {
    reservableId,
    reservationGroupId,
    start,
    end,
    backup
  }
});
var updateReservation = async ({ id, backup, reservationGroupId, reservableId, start, end }) => await prisma.reservation.update({
  where: {
    id
  },
  data: {
    reservableId,
    reservationGroupId,
    start,
    end,
    backup
  }
});
var getStatusOfReservation = async ({ reservationGroupId }) => await prisma.reservation.findFirst({
  where: {
    reservationGroupId
  },
  select: {
    status: true
  }
});
var setStatusOfReservation = async ({ id, status }) => await prisma.reservation.update({
  where: {
    id
  },
  data: {
    status
  }
});
var setStatusOfReservationsInGroup = async ({ reservationGroupId, status }) => {
  const r = await getStatusOfReservation({ reservationGroupId });
  return await prisma.reservation.updateMany({
    where: {
      reservationGroupId
    },
    data: {
      status,
      previousStatus: r == null ? void 0 : r.status
    }
  });
};
var deleteReservation = ({ id }) => prisma.reservation.deleteMany({
  where: { id }
});

// app/models/reservationGroup.server.ts
var getReservationGroup = async ({ id }) => await prisma.reservationGroup.findFirst({
  where: { id },
  include: {
    reservations: {
      include: {
        reservable: {
          include: {
            place: {
              include: {
                openingTimes: true,
                reservables: {
                  include: {
                    reservations: true,
                    ReservableType: {
                      include: {
                        multiLangName: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
var getReservationGroupForConfirmationEmail = async ({ id }) => await prisma.reservationGroup.findFirst({
  where: { id },
  include: {
    user: true,
    reservations: {
      include: {
        reservable: {
          include: {
            place: true
          }
        }
      }
    }
  }
});
var getReservationGroupList = async () => await prisma.reservationGroup.findMany({
  include: {
    user: true,
    reservations: {
      include: {
        reservable: {
          include: {
            place: {
              include: {
                company: true
              }
            }
          }
        }
      }
    }
  }
});
var createReservationGroup = async ({ note, userId }) => await prisma.reservationGroup.create({
  data: {
    note,
    userId
  }
});
var updateReservationGroup = async ({ id, note, userId }) => await prisma.reservationGroup.update({
  where: {
    id
  },
  data: {
    note,
    userId
  },
  include: {
    reservations: true
  }
});

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/$placeId/reserve.tsx
var badRequest4 = (data) => (0, import_server_runtime8.json)(data, { status: 400 });
var loader8 = async ({ request, params }) => {
  const { username } = await requireUsernameAndAdmin(request);
  const place = await getPlaceWithReservations({ id: params.placeId ?? "" });
  return (0, import_server_runtime8.json)({ username, place });
};
var action7 = async ({ request }) => {
  var _a, _b, _c;
  const form = await request.formData();
  const note = (_a = form.get("note")) == null ? void 0 : _a.toString();
  const placeId = (_b = form.get("placeId")) == null ? void 0 : _b.toString();
  const username = (_c = form.get("username")) == null ? void 0 : _c.toString();
  const reservationBackup = form.getAll("reservationBackup[]").map((r) => r.toString());
  const reservableId = form.getAll("reservableId[]").map((r) => r.toString()).filter((r) => r != "-1");
  const dateTimeStart = form.getAll("start[]").map((r) => r.toString());
  const dateTimeEnd = form.getAll("end[]").map((r) => r.toString());
  const datesInPast = dateTimeStart.find((s) => new Date(s).getTime() < new Date().getTime());
  if (dateTimeEnd.length == 0 || dateTimeStart.length == 0 || datesInPast || !placeId || !username || !reservableId) {
    return badRequest4({
      fields: {
        note: note ?? "",
        placeId: placeId ?? "",
        username: username ?? ""
      },
      formError: "Fill everything in pls."
    });
  }
  const user = await getUserId({ username });
  await sendCreationEmail(username);
  const resGroup = user ? await createReservationGroup({ note: note ?? "", userId: user.id }) : null;
  if (resGroup == null) {
    return badRequest4({
      fields: {
        note: note ?? "",
        placeId: placeId ?? "",
        username: username ?? ""
      },
      formError: "Cannot find who you are :(."
    });
  }
  const promises = [];
  dateTimeStart.forEach((d, i) => {
    promises.push(createReservation({ backup: reservationBackup[i] == "1", start: new Date(dateTimeStart[i]), end: new Date(dateTimeEnd[i]), reservableId: reservableId[i] ?? null, reservationGroupId: resGroup.id ?? null }));
  });
  await Promise.all(promises);
  return (0, import_server_runtime8.redirect)(`/profile`);
};
var HeaderBar = import_styled_components29.default.div`
  background-color: ${(props) => props.color == "primary" ? styles.colors.primary : props.color == "gray" ? styles.colors.gray[10] : ""};
  @media (min-width: 500px) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.6rem 0.9rem 1.6rem;
  & h5 {
    color: ${(props) => props.color == "primary" ? styles.colors.white : styles.colors.black};
    font-size: 1.2rem;
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    row-gap: 0.6rem;
  }
`;
var Title8 = import_styled_components29.default.h5`
  margin: 0;
`;
var ButtonWrap = import_styled_components29.default.div`
  max-width: 400px;
  margin: 0 auto;
`;
var Wrap13 = import_styled_components29.default.div`
  max-width: 938px;
  display: flex;
  @media (min-width: 500px) {
    padding: 0rem 2rem;
  }
  flex-direction: column;
  margin: 2rem auto;
`;
var Flex4 = import_styled_components29.default.div`
  display: flex;
  align-items: center;
  & h5 {
    font-weight: 500;
    margin-right: 1.5rem;
  }
`;
var TextWrap2 = import_styled_components29.default.div`
  padding: 0.5rem 1.6rem;
`;
var SlotList2 = import_styled_components29.default.div`
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 500px) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  gap: 1.5rem;
  background-color: ${styles.colors.primary};
`;
var BackupSlotList2 = (0, import_styled_components29.default)(SlotList2)`
  background-color: ${styles.colors.gray[5]};
`;
var ResE2 = import_styled_components29.default.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
var SlotListTitle2 = import_styled_components29.default.div`
  font-size: 16px;
  font-weight: 600;
`;
var WhiteSlotListTitle2 = (0, import_styled_components29.default)(SlotListTitle2)`
  color: ${styles.colors.white};
`;
var BackupSlotText2 = import_styled_components29.default.p`

`;
var SlotText2 = (0, import_styled_components29.default)(BackupSlotText2)`
  color: ${styles.colors.white};  
`;
var FlexSL2 = import_styled_components29.default.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.4rem;
  flex-wrap: wrap;
  & > p {
    margin: 0;
  }
`;
function ReservationElement() {
  var _a;
  const params = (0, import_react47.useParams)();
  const s = (0, import_react47.useSubmit)();
  const formRef = import_react48.default.useRef(null);
  const [confirmationDialog, setConfirmationDialog] = import_react48.default.useState(false);
  const { username, place } = (0, import_react47.useLoaderData)();
  const reservables = place.reservables;
  const actionData = (0, import_react47.useActionData)();
  const [resList, setResList] = (0, import_react48.useState)([]);
  const [date, setDate] = import_react48.default.useState(null);
  const [backup, setBackup] = import_react48.default.useState(false);
  console.log(resList);
  return /* @__PURE__ */ import_react48.default.createElement(Wrap13, null, /* @__PURE__ */ import_react48.default.createElement(ReserveConfirmationDialog, {
    hidden: !confirmationDialog,
    onConfirm: () => {
      if (formRef.current)
        s(formRef.current);
    },
    title: "Create reservation?",
    text: "Is all the information correct?",
    confirmText: "Yes, create reservation",
    cancelText: "No, go back",
    close: () => {
      setConfirmationDialog(false);
    },
    subHeaderText: "Is all of the information bellow correct?",
    resList,
    reservables,
    backupTitle: resList.filter((r) => r.isBackup).length > 0 ? "What does this mean?" : "Cannot go any other time?",
    backupText1: resList.filter((r) => r.isBackup).length > 0 && resList.filter((r) => !r.isBackup).length > 1 ? /* @__PURE__ */ import_react48.default.createElement("span", null, "We will try to book all your primary slots. If ", /* @__PURE__ */ import_react48.default.createElement("b", null, "*any* (read: at least one)"), " of them are unavailable, we will try your backup option.") : resList.filter((r) => r.isBackup).length > 0 && resList.filter((r) => !r.isBackup).length == 1 ? /* @__PURE__ */ import_react48.default.createElement("span", null, "We will try to book your primary slot. If it's unavailable, we will try your backup option.") : /* @__PURE__ */ import_react48.default.createElement("span", null, "Please keep in mind that for the time being, we cannot guarantee a free spot at this business. That\u2019s why we provide the option to choose a backupslot, which we will book you into if your first choice isn\u2019t free."),
    backupText2: resList.filter((r) => r.isBackup).length > 0 ? /* @__PURE__ */ import_react48.default.createElement("span", null, "Please keep in mind that for the time being, we cannot guarantee a free spot at this business. To help us bring this functionality to everyone, you can share this service with your friends! Thanks for understanding. :)") : /* @__PURE__ */ import_react48.default.createElement("span", null, "To help us bring real-time availability information to everyone, you can share this service with your friends! Thanks for understanding. :)")
  }), /* @__PURE__ */ import_react48.default.createElement(ButtonWrap, null, /* @__PURE__ */ import_react48.default.createElement(SecondaryButton, {
    inSearch: false,
    style: { alignSelf: "start" },
    to: `/${place.id}`
  }, "View Place Details")), /* @__PURE__ */ import_react48.default.createElement(import_react47.Form, {
    method: "post",
    ref: formRef
  }, /* @__PURE__ */ import_react48.default.createElement(IdInput, {
    name: "username",
    value: username
  }), /* @__PURE__ */ import_react48.default.createElement(IdInput, {
    name: "placeId",
    value: params.placeId ?? ""
  }), /* @__PURE__ */ import_react48.default.createElement(HeaderBar, {
    color: "primary"
  }, /* @__PURE__ */ import_react48.default.createElement(Title8, null, "Make a Reservation"), /* @__PURE__ */ import_react48.default.createElement(Flex4, null, /* @__PURE__ */ import_react48.default.createElement(Title8, null, "Date"), /* @__PURE__ */ import_react48.default.createElement(DateInput, {
    disablePast: true,
    name: "date",
    defaultValue: date,
    onChange: setDate
  }))), date && /* @__PURE__ */ import_react48.default.createElement(ReservableTimes, {
    startName: "start[]",
    endName: "end[]",
    reservationBackupName: "reservationBackup[]",
    reservationIdName: "reservationId[]",
    reservableIdName: "reservableId[]",
    reservables,
    setResList,
    date,
    openingTime: place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)]
  }), /* @__PURE__ */ import_react48.default.createElement(SlotList2, null, /* @__PURE__ */ import_react48.default.createElement(WhiteSlotListTitle2, null, resList.filter((r) => !r.isBackup).length == 0 ? /* @__PURE__ */ import_react48.default.createElement("i", {
    style: { fontWeight: "normal" }
  }, "Nothing selected.") : "Picked timeslots"), resList.filter((r) => !r.isBackup).map((r) => {
    var _a2;
    return r.startTime && r.endTime && /* @__PURE__ */ import_react48.default.createElement(ResE2, null, /* @__PURE__ */ import_react48.default.createElement(Indicator, {
      style: { padding: "0.5rem", whiteSpace: "nowrap" }
    }, (_a2 = reservables.find((x) => x.id == r.reservableId)) == null ? void 0 : _a2.name), /* @__PURE__ */ import_react48.default.createElement(FlexSL2, null, /* @__PURE__ */ import_react48.default.createElement(SlotText2, null, "Date: ", getStringDateValue(r.startTime)), /* @__PURE__ */ import_react48.default.createElement(SlotText2, null, "Time: ", getStringTimeValue(r.startTime), " - ", getStringTimeValue(new Date(r.endTime)))));
  })), /* @__PURE__ */ import_react48.default.createElement(HeaderBar, {
    color: "gray"
  }, /* @__PURE__ */ import_react48.default.createElement(Title8, null, "Backup timeslot"), /* @__PURE__ */ import_react48.default.createElement(SecondaryButtonBtn, {
    onClick: (e) => {
      e.preventDefault();
      setBackup(!backup);
    }
  }, !backup ? "Choose a" : "Remove", " backup timeslot")), backup && date && /* @__PURE__ */ import_react48.default.createElement(ReservableTimes, {
    backup: true,
    startName: "start[]",
    endName: "end[]",
    reservationBackupName: "reservationBackup[]",
    reservationIdName: "reservationId[]",
    reservableIdName: "reservableId[]",
    reservables,
    date,
    setResList,
    openingTime: place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)]
  }), /* @__PURE__ */ import_react48.default.createElement(BackupSlotList2, null, /* @__PURE__ */ import_react48.default.createElement(SlotListTitle2, null, resList.filter((r) => r.isBackup).length == 0 ? /* @__PURE__ */ import_react48.default.createElement("i", {
    style: { fontWeight: "normal" }
  }, "Nothing selected.") : "Picked backup timeslots"), resList.filter((r) => r.isBackup).map((r) => {
    var _a2;
    return r.startTime && r.endTime && /* @__PURE__ */ import_react48.default.createElement(ResE2, null, /* @__PURE__ */ import_react48.default.createElement(Indicator, {
      style: { padding: "0.5rem" }
    }, (_a2 = reservables.find((x) => x.id == r.reservableId)) == null ? void 0 : _a2.name), /* @__PURE__ */ import_react48.default.createElement(FlexSL2, null, /* @__PURE__ */ import_react48.default.createElement(BackupSlotText2, null, getStringDateValue(r.startTime)), /* @__PURE__ */ import_react48.default.createElement(BackupSlotText2, null, getStringTimeValue(r.startTime), " - ", getStringTimeValue(new Date(r.endTime)))));
  })), /* @__PURE__ */ import_react48.default.createElement(HeaderBar, {
    color: "none",
    style: { marginBottom: "0px" }
  }, /* @__PURE__ */ import_react48.default.createElement(Title8, null, "Additional info")), /* @__PURE__ */ import_react48.default.createElement(TextWrap2, null, /* @__PURE__ */ import_react48.default.createElement(TextInput, {
    name: "note",
    title: "Note",
    defaultValue: ((_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.note) ?? ""
  })), /* @__PURE__ */ import_react48.default.createElement(MainButtonBtn, {
    disabled: resList.filter((r) => !r.isBackup).length == 0,
    style: { margin: "2rem auto" },
    onClick: (e) => {
      e.preventDefault();
      setConfirmationDialog(true);
    }
  }, "Create reservation", /* @__PURE__ */ import_react48.default.createElement(AnglesRight_default, {
    height: "1.5rem"
  })), (actionData == null ? void 0 : actionData.formError) && /* @__PURE__ */ import_react48.default.createElement("p", null, actionData.formError ?? "")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/$placeId/index.tsx
var placeId_exports2 = {};
__export(placeId_exports2, {
  default: () => PlaceDetails,
  loader: () => loader9
});
var import_react49 = require("@remix-run/react");
var import_server_runtime9 = require("@remix-run/server-runtime");
var import_styled_components30 = __toESM(require("styled-components"));
var Wrap14 = import_styled_components30.default.div`
  padding: 2rem;
  border-radius: 1.5rem;
  margin-top: 2rem;
  box-sizing: border-box;
  max-width: 968px;
  width: 100%;
  margin: 0px auto;
`;
var Title9 = import_styled_components30.default.h4`
  font-size: 1.3rem;
  margin: 0px;
`;
var DetailsWrap = import_styled_components30.default.div`

`;
var TimesWrap = import_styled_components30.default.div`
  flex-shrink: 0;
  background-color: ${styles.colors.primary};
  color: ${styles.colors.white};
  padding: 1.5rem 1.25rem;
  border-radius: 0.5rem;
`;
var Desc = import_styled_components30.default.p`

`;
var OpeningDay = import_styled_components30.default.p`
  font-weight: bold;
  font-size: 0.75rem;
  margin: 0;
`;
var OpeningTime = import_styled_components30.default.p`
  font-size: 1rem;
  margin: 0;
  &::first-letter {
    text-transform:capitalize;
  }
`;
var loader9 = async ({ params }) => {
  return (0, import_server_runtime9.json)({ place: await getPlace({ id: params.placeId ?? "" }) });
};
var GalleryImage = import_styled_components30.default.img`
  object-fit: cover;
  width: 20rem;
  aspect-ratio: 1;
  max-width: 90%;
`;
var Gallery = import_styled_components30.default.div`
  overflow-x: scroll;
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 1rem;
  white-space: nowrap;
`;
var FlexApart3 = import_styled_components30.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
  @media (max-width: 800px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
var TimesGrid = import_styled_components30.default.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
function PlaceDetails({}) {
  const { place } = (0, import_react49.useLoaderData)();
  const timeStr = (date) => {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
  };
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  console.log(place.description != "" ? place.description : "No description");
  return /* @__PURE__ */ React.createElement(Wrap14, null, /* @__PURE__ */ React.createElement(FlexApart3, null, /* @__PURE__ */ React.createElement(Title9, null, "Make a reservation"), /* @__PURE__ */ React.createElement(MainButton, {
    inSearch: false,
    to: `/${place.id}/reserve`
  }, "Reserve", /* @__PURE__ */ React.createElement(AnglesRight_default, {
    height: "1.25rem"
  }))), /* @__PURE__ */ React.createElement(FlexApart3, {
    style: { alignItems: "flex-start" }
  }, /* @__PURE__ */ React.createElement(DetailsWrap, null, /* @__PURE__ */ React.createElement(Title9, null, "Description"), /* @__PURE__ */ React.createElement(Desc, null, place.description != "" ? place.description : /* @__PURE__ */ React.createElement("i", null, "No description")), /* @__PURE__ */ React.createElement(Title9, null, "How do I get there?"), /* @__PURE__ */ React.createElement(Desc, null, place.howToGetThere != "" ? place.howToGetThere : /* @__PURE__ */ React.createElement("i", null, "Just follow Google Maps :)"))), /* @__PURE__ */ React.createElement(TimesWrap, null, /* @__PURE__ */ React.createElement(Title9, null, "Opening Times"), /* @__PURE__ */ React.createElement(TimesGrid, null, place.openingTimes ? place.openingTimes.sort((a, b) => a.day - b.day).map((o) => /* @__PURE__ */ React.createElement("div", {
    key: o.id
  }, /* @__PURE__ */ React.createElement(OpeningDay, null, daysOfWeek[o.day].split("")[0].toUpperCase() + daysOfWeek[o.day].split("").slice(1).join("")), /* @__PURE__ */ React.createElement(OpeningTime, null, timeStr(o.open), " - ", timeStr(o.close)))) : null))), place.galleryPicUrls.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title9, null, "Gallery"), /* @__PURE__ */ React.createElement(Gallery, null, place.galleryPicUrls.map((p, i) => /* @__PURE__ */ React.createElement(GalleryImage, {
    key: i,
    src: p
  })))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  default: () => Profile,
  loader: () => loader10
});
var import_react53 = require("@remix-run/react");

// app/components/profile/reservation-group-summary.tsx
var import_react51 = require("@remix-run/react");
var import_react52 = __toESM(require("react"));
var import_styled_components33 = __toESM(require("styled-components"));

// app/components/confirmation-dialog.tsx
var import_react50 = __toESM(require("react"));
var import_styled_components31 = __toESM(require("styled-components"));
var Wrap15 = import_styled_components31.default.div`
  position: fixed;
  visibility: ${(props) => props.hidden ? "hidden" : "visible"};
  transition: opacity 0.15s ease-in-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(0.9);
  opacity: 0;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Window2 = import_styled_components31.default.div`
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[0]};
  width: 32rem;
  display: flex;
  max-width: 100%;
  border-radius: 1rem;
  @media (max-width: 650px) {
    width: 100%;
    border-radius: 0;
  }
  flex-direction: column;
  gap: 1.3rem;
  padding: 1.5rem;
  z-index: 8;
`;
var Backdrop3 = import_styled_components31.default.div`
  position: fixed;
  z-index: 7;
  display: ${(props) => props.hidden ? "none" : ""};
  background-color: ${styles.colors.black}40;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: scale(150%);
  width: 100vw;
  height: 100vh;
  align-items: center;
`;
var Title10 = import_styled_components31.default.h2`
  margin: 0px;
  font-weight: 600;
`;
var Text5 = import_styled_components31.default.p`
  margin: 0px;
  font-weight: 500;
`;
var ButtonRow2 = import_styled_components31.default.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
var ConfirmationDialog = ({ hidden, title, text, confirmText, cancelText, onConfirm, close }) => {
  const wrap = import_react50.default.useRef(null);
  import_react50.default.useEffect(() => {
    setTimeout(() => {
      if (wrap.current) {
        wrap.current.style.opacity = hidden ? "0" : "1";
        wrap.current.style.transform = hidden ? "scale(0.9)" : "scale(1)";
      }
    }, 100);
  }, [hidden]);
  return /* @__PURE__ */ import_react50.default.createElement(Wrap15, {
    hidden,
    ref: wrap
  }, /* @__PURE__ */ import_react50.default.createElement(Backdrop3, {
    onClick: close
  }), /* @__PURE__ */ import_react50.default.createElement(Window2, null, /* @__PURE__ */ import_react50.default.createElement(Title10, null, title), /* @__PURE__ */ import_react50.default.createElement(Text5, null, text), /* @__PURE__ */ import_react50.default.createElement(ButtonRow2, null, /* @__PURE__ */ import_react50.default.createElement(SecondaryButtonBtn, {
    onClick: (e) => {
      e.preventDefault();
      close();
    }
  }, cancelText), /* @__PURE__ */ import_react50.default.createElement(MainButtonBtn, {
    onClick: (e) => {
      onConfirm();
      close();
      e.preventDefault();
    }
  }, confirmText))));
};

// app/components/profile/reservation-summary.tsx
var import_styled_components32 = __toESM(require("styled-components"));
var Wrap16 = import_styled_components32.default.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;
var Flex5 = import_styled_components32.default.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  &>div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7rem;
  }
`;
var Value2 = import_styled_components32.default.p`
  font-size: 0.9125rem;
  margin-top: 0.2rem;
  font-weight: 500;
  margin-bottom: 0;
`;
var ReservationSummary = ({ reservation: r, style }) => {
  var _a;
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(Wrap16, {
    style
  }, ((_a = r == null ? void 0 : r.reservable) == null ? void 0 : _a.ReservableType.multiLangName) && /* @__PURE__ */ React.createElement(Indicator, {
    style: { padding: "0.5rem 1rem" },
    key: r.id
  }, r.reservable.ReservableType.multiLangName[lang]), /* @__PURE__ */ React.createElement(Flex5, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Calendar_default, {
    height: "1rem"
  }), /* @__PURE__ */ React.createElement(Value2, null, new Date(r.start).toLocaleDateString())), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Clock_default, {
    height: "1rem"
  }), /* @__PURE__ */ React.createElement(Value2, null, getStringTimeValue(new Date(r.start)), " - ", getStringTimeValue(new Date(r.end))))));
};

// app/components/profile/reservation-group-summary.tsx
var Title11 = (0, import_styled_components33.default)(import_react51.Link)`
  margin: 0;
  font-weight: bold;
  text-decoration: none;
  color: ${styles.colors.black};
  font-size: 1.2rem;
`;
var NoteTitle = import_styled_components33.default.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  color: ${styles.colors.action};
`;
var Value3 = import_styled_components33.default.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;
var Wrap17 = import_styled_components33.default.div`
  display: grid;
  grid-template-rows: 9rem auto;
  @media (min-width: 550px) {
    grid-template-rows: unset;
    grid-template-columns: 11rem auto;
  }
  overflow: hidden;
  gap: 0.87rem;
  transition:
    height 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    padding 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    margin 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  border-radius: 0.6rem;
  background-color: ${styles.colors.gray[5]};
  padding: 1.3rem 1rem;
  margin-top: 1rem;
  /* &>* {
    flex-shrink: 0;
  } */
`;
var CancelWrap = import_styled_components33.default.div`
  width: 100%;
  @media (min-width: 550px) {
    width: auto;
    align-self: flex-end;
  }
`;
var TitleStatus = import_styled_components33.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
var SlotTitle = import_styled_components33.default.p`
  margin: 0;
`;
var InnerWrap3 = import_styled_components33.default.div`
  display: flex;
  flex-direction: column;
  gap: 0.87rem;
  align-items: flex-start;
`;
var Status = import_styled_components33.default.p`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 0.25rem;
  margin: 0;
`;
var Line = import_styled_components33.default.div`
  height: 1px;
  width: 100%;
  background-color: ${styles.colors.gray[30]};
`;
var ReservationGroupSummary = ({ reservationGroup: rg, onCancel }) => {
  var _a, _b, _c;
  const ref = import_react52.default.useRef(null);
  const formRef = import_react52.default.useRef(null);
  const [showConfirmation, setShowConfirmation] = import_react52.default.useState(false);
  const cancelReservation = () => {
    if (ref.current) {
      ref.current.style.height = `${ref.current.clientHeight - parseFloat(window.getComputedStyle(ref.current).paddingTop) - parseFloat(window.getComputedStyle(ref.current).paddingBottom)}px`;
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.height = "0px";
          ref.current.style.paddingTop = "0px";
          ref.current.style.marginTop = "0px";
          ref.current.style.opacity = "0";
          ref.current.style.paddingBottom = "0px";
        }
      }, 100);
    }
    if (formRef.current)
      onCancel(rg.id, formRef.current);
  };
  const prefs = rg.reservations.filter((r) => !r.backup).length;
  const backups = rg.reservations.filter((r) => r.backup).length;
  console.log(rg);
  const prefStatus = rg.reservations.filter((r) => !r.backup)[prefs - 1].status;
  const backupStatus = backups > 0 ? rg.reservations.filter((r) => r.backup)[backups - 1].status : null;
  const text = prefStatus == 0 /* AwaitingConfirmation */ || backupStatus == 0 /* AwaitingConfirmation */ ? "Awaiting confirmation" : prefStatus == 1 /* Confirmed */ && backupStatus == null ? "Confirmed" : prefStatus == 2 /* Rejected */ && backupStatus == null ? "Unavailable" : prefStatus == 1 /* Confirmed */ && backupStatus == 3 /* Cancelled */ ? "Preferred Confirmed" : prefStatus == 2 /* Rejected */ && backupStatus == 1 /* Confirmed */ ? "Backup Confirmed" : prefStatus == 2 /* Rejected */ && backupStatus == 2 /* Rejected */ ? "Unavailable" : prefStatus == 3 /* Cancelled */ && backupStatus == 3 /* Cancelled */ ? "Cancelled" : "";
  const backgroundColor = prefStatus == 0 /* AwaitingConfirmation */ || backupStatus == 0 /* AwaitingConfirmation */ ? styles.colors.warn : prefStatus == 1 /* Confirmed */ && backupStatus == null ? styles.colors.free : prefStatus == 2 /* Rejected */ && backupStatus == null ? styles.colors.busy : prefStatus == 1 /* Confirmed */ && backupStatus == 3 /* Cancelled */ ? styles.colors.free : prefStatus == 2 /* Rejected */ && backupStatus == 1 /* Confirmed */ ? styles.colors.free : prefStatus == 2 /* Rejected */ && backupStatus == 2 /* Rejected */ ? styles.colors.busy : prefStatus == 3 /* Cancelled */ && backupStatus == 3 /* Cancelled */ ? styles.colors.gray[70] : "";
  const color = prefStatus == 0 /* AwaitingConfirmation */ || backupStatus == 0 /* AwaitingConfirmation */ ? styles.colors.black : prefStatus == 1 /* Confirmed */ && backupStatus == null ? styles.colors.black : prefStatus == 2 /* Rejected */ && backupStatus == null ? styles.colors.white : prefStatus == 1 /* Confirmed */ && backupStatus == 3 /* Cancelled */ ? styles.colors.black : prefStatus == 2 /* Rejected */ && backupStatus == 1 /* Confirmed */ ? styles.colors.black : prefStatus == 2 /* Rejected */ && backupStatus == 2 /* Rejected */ ? styles.colors.white : prefStatus == 3 /* Cancelled */ && backupStatus == 3 /* Cancelled */ ? styles.colors.black : "";
  return /* @__PURE__ */ import_react52.default.createElement(import_react52.default.Fragment, null, /* @__PURE__ */ import_react52.default.createElement(ConfirmationDialog, {
    title: "Confirm cancellation",
    text: "Are you sure you want to cancel your reservation? (This cannot be undone!)",
    hidden: !showConfirmation,
    onConfirm: () => {
      cancelReservation();
    },
    close: () => {
      setShowConfirmation(false);
    },
    confirmText: "Cancel my reservation",
    cancelText: "Keep my reservation"
  }), /* @__PURE__ */ import_react52.default.createElement(Wrap17, {
    key: rg.id,
    ref
  }, /* @__PURE__ */ import_react52.default.createElement(PlaceImage, {
    shape: "square",
    imageUrl: (_a = rg.reservations[0].reservable) == null ? void 0 : _a.place.profilePicUrl
  }), /* @__PURE__ */ import_react52.default.createElement(InnerWrap3, null, /* @__PURE__ */ import_react52.default.createElement(TitleStatus, null, /* @__PURE__ */ import_react52.default.createElement(Title11, {
    to: `/${(_b = rg.reservations[0].reservable) == null ? void 0 : _b.place.id}`
  }, rg.reservations.length > 0 ? (_c = rg.reservations[0].reservable) == null ? void 0 : _c.place.name : "Reservation"), /* @__PURE__ */ import_react52.default.createElement(Status, {
    style: {
      backgroundColor,
      color
    }
  }, text)), prefs > 0 && /* @__PURE__ */ import_react52.default.createElement(import_react52.default.Fragment, null, /* @__PURE__ */ import_react52.default.createElement(SlotTitle, {
    style: text == "Backup Confirmed" ? { opacity: 0.5 } : {}
  }, "Preffered slot", prefs > 1 && "s", ":"), rg.reservations.filter((r) => !r.backup).map((r) => /* @__PURE__ */ import_react52.default.createElement("div", {
    key: r.id
  }, /* @__PURE__ */ import_react52.default.createElement(ReservationSummary, {
    style: text == "Backup Confirmed" ? { opacity: 0.5 } : {},
    reservation: r
  }))), /* @__PURE__ */ import_react52.default.createElement(Line, null)), backups > 0 && /* @__PURE__ */ import_react52.default.createElement(import_react52.default.Fragment, null, /* @__PURE__ */ import_react52.default.createElement(SlotTitle, {
    style: text == "Preferred Confirmed" ? { opacity: 0.5 } : {}
  }, "Backup slot", backups > 1 && "s", ":"), rg.reservations.filter((r) => r.backup).map((r) => /* @__PURE__ */ import_react52.default.createElement("div", {
    key: r.id
  }, /* @__PURE__ */ import_react52.default.createElement(ReservationSummary, {
    style: text == "Preferred Confirmed" ? { opacity: 0.5 } : {},
    reservation: r
  }))), /* @__PURE__ */ import_react52.default.createElement(Line, null)), rg.note && /* @__PURE__ */ import_react52.default.createElement("div", null, /* @__PURE__ */ import_react52.default.createElement(NoteTitle, null, "Note"), /* @__PURE__ */ import_react52.default.createElement(Value3, null, rg.note)), /* @__PURE__ */ import_react52.default.createElement(CancelWrap, null, /* @__PURE__ */ import_react52.default.createElement(SecondaryButtonBtn, {
    style: { width: "100%" },
    onClick: (e) => {
      setShowConfirmation(true);
    }
  }, "Cancel reservation"))), /* @__PURE__ */ import_react52.default.createElement(import_react51.Form, {
    ref: formRef,
    method: "post",
    action: "/profile/cancelReservation",
    style: { visibility: "hidden" }
  }, /* @__PURE__ */ import_react52.default.createElement(IdInput, {
    name: "rgId",
    value: rg.id
  }))));
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/profile.tsx
var import_styled_components34 = __toESM(require("styled-components"));
var loader10 = async ({ request }) => {
  const user = await getUserByUsername({ username: (await requireUsernameAndAdmin(request)).username });
  if (user) {
    user.passwordHash = "";
  }
  return { user };
};
var ReservationsWrap = import_styled_components34.default.div`
  padding: 2rem 0.5rem;
  max-width: 968px;
  margin: 0 auto;
`;
var ReservationsTitle = import_styled_components34.default.h4`
  margin-top: 0;
  @media (min-width: 500px) {
    font-size: 1.8rem;
  }
  margin-left: 1rem;
`;
var NoReservations = import_styled_components34.default.p`
  margin-left: 1rem;
  font-weight: 500;
`;
function Profile() {
  const { user } = (0, import_react53.useLoaderData)();
  const submit = (0, import_react53.useSubmit)();
  const cancelRg = (form) => {
    submit(form, { replace: true });
  };
  const reservationGroups = user == null ? void 0 : user.reservationGroups.filter((rg) => rg.reservations.length > 0);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react53.Outlet, null), /* @__PURE__ */ React.createElement(ReservationsWrap, null, /* @__PURE__ */ React.createElement(ReservationsTitle, null, "Your Reservations"), (reservationGroups == null ? void 0 : reservationGroups.length) == 0 && /* @__PURE__ */ React.createElement(NoReservations, null, "You don't have any reservations :'(. Go ahead and make some!"), reservationGroups == null ? void 0 : reservationGroups.map((rg) => /* @__PURE__ */ React.createElement("div", {
    key: rg.id
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReservationGroupSummary, {
    onCancel: (rgId, formRef) => {
      setTimeout(() => {
        cancelRg(formRef);
      }, 450);
    },
    reservationGroup: rg
  }))))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/profile/cancelReservation.tsx
var cancelReservation_exports = {};
__export(cancelReservation_exports, {
  action: () => action8,
  default: () => CancelReservation
});
var import_server_runtime10 = require("@remix-run/server-runtime");
var action8 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const reservationGroupId = getFormItem("rgId");
  await setStatusOfReservationsInGroup({ reservationGroupId, status: 3 /* Cancelled */ });
  await sendCancellationEmail();
  return (0, import_server_runtime10.redirect)("/profile");
};
function CancelReservation() {
  return /* @__PURE__ */ React.createElement("div", null);
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/profile/index.tsx
var profile_exports2 = {};
__export(profile_exports2, {
  default: () => ProfileIndex,
  loader: () => loader11
});
var import_react54 = require("@remix-run/react");
var loader11 = async ({ request }) => {
  const user = await getUserByUsername({ username: (await requireUsernameAndAdmin(request)).username });
  if (user) {
    user.passwordHash = "";
  }
  return { user };
};
function ProfileIndex() {
  const { user } = (0, import_react54.useLoaderData)();
  return /* @__PURE__ */ React.createElement(AccountSummary, {
    user: user ?? null,
    editing: false
  });
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/profile/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  action: () => action9,
  default: () => ProfileEdit,
  loader: () => loader12
});
var import_react55 = require("@remix-run/react");
var import_server_runtime11 = require("@remix-run/server-runtime");
var loader12 = async ({ request }) => {
  const user = await getUserByUsername({ username: (await requireUsernameAndAdmin(request)).username });
  if (user) {
    user.passwordHash = "";
  }
  return { user };
};
var action9 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const id = getFormItem("id");
  const firstName = getFormItem("firstName");
  const lastName = getFormItem("lastName");
  const phone = getFormItem("phone");
  if (id && firstName && lastName && phone) {
    await updateUser({
      id,
      firstName,
      lastName,
      phone
    });
    return (0, import_server_runtime11.redirect)("/profile");
  }
  return {};
};
function ProfileEdit() {
  const { user } = (0, import_react55.useLoaderData)();
  return /* @__PURE__ */ React.createElement(AccountSummary, {
    editing: true,
    user: user ?? null
  });
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action10,
  default: () => Logout
});
var action10 = async ({ request }) => {
  var _a;
  const form = await request.formData();
  const redirectUrl = (_a = form.get("redirectUrl")) == null ? void 0 : _a.toString();
  return logout(request, redirectUrl ?? "/");
};
function Logout() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/places.tsx
var places_exports = {};
__export(places_exports, {
  default: () => Places,
  loader: () => loader13
});
var import_server_runtime12 = require("@remix-run/server-runtime");
var import_react58 = require("@remix-run/react");
var import_styled_components36 = __toESM(require("styled-components"));

// app/models/location.server.ts
var createLocation = async ({ multiLangCity, multiLangCountry }) => await prisma.location.create({
  data: {
    multiLangCity: {
      create: {
        czech: multiLangCity.czech,
        english: multiLangCity.english
      }
    },
    multiLangCountry: {
      create: {
        czech: multiLangCountry.czech,
        english: multiLangCountry.english
      }
    },
    cityCountry: multiLangCity.english + multiLangCountry.english
  }
});
var updateLocation = async ({ id, multiLangCity, multiLangCountry }) => await prisma.location.update({
  where: {
    id
  },
  data: {
    multiLangCity: {
      update: {
        czech: multiLangCity.czech,
        english: multiLangCity.english
      }
    },
    multiLangCountry: {
      update: {
        czech: multiLangCountry.czech,
        english: multiLangCountry.english
      }
    },
    cityCountry: multiLangCity.english + multiLangCountry.english
  }
});
var getLocation = async ({ id }) => await prisma.location.findFirst({
  where: { id },
  include: {
    places: true,
    multiLangCity: true,
    multiLangCountry: true
  }
});
var getLocationByName = async ({ cityCountry }) => await prisma.location.findFirst({
  where: { cityCountry },
  include: {
    places: true,
    multiLangCity: true,
    multiLangCountry: true
  }
});
var getLocationList = async ({ cityCountry: nameFragment }) => await prisma.location.findMany({
  where: { cityCountry: { contains: nameFragment, mode: "insensitive" } },
  include: {
    places: true,
    multiLangCity: true,
    multiLangCountry: true
  }
});
var getAllLocations = async () => await prisma.location.findMany({
  include: {
    places: true,
    multiLangCity: true,
    multiLangCountry: true
  }
});

// app/models/tag.server.ts
var createTag = async ({ multiLangName, multiLangDesc }) => await prisma.tag.create({
  data: {
    multiLangDesc: {
      create: {
        czech: multiLangDesc.czech,
        english: multiLangDesc.english
      }
    },
    multiLangName: {
      create: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var updateTag = async ({ id, multiLangName, multiLangDesc }) => await prisma.tag.update({
  where: {
    id
  },
  data: {
    multiLangDesc: {
      update: {
        czech: multiLangDesc.czech,
        english: multiLangDesc.english
      }
    },
    multiLangName: {
      update: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var getTag = async ({ id }) => await prisma.tag.findFirst({
  where: { id },
  include: {
    places: true,
    multiLangName: true,
    multiLangDesc: true
  }
});
var getTagList = async ({ nameFragment }) => await prisma.tag.findMany({
  where: {
    OR: [{
      multiLangName: {
        english: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }, {
      multiLangName: {
        czech: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }]
  },
  include: {
    places: true,
    multiLangName: true,
    multiLangDesc: true
  }
});
var getAllTags = async () => await prisma.tag.findMany({
  include: {
    places: true,
    multiLangName: true,
    multiLangDesc: true
  }
});

// app/models/category.server.ts
var createCategory = async ({ multiLangName }) => await prisma.category.create({
  data: {
    multiLangName: {
      create: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var updateCategory = async ({ id, multiLangName }) => await prisma.category.update({
  where: {
    id
  },
  data: {
    multiLangName: {
      update: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var getCategory = async ({ id }) => await prisma.category.findFirst({
  where: { id },
  include: {
    places: true,
    multiLangName: true
  }
});
var getCategoryList = async ({ nameFragment }) => await prisma.category.findMany({
  where: {
    OR: [{
      multiLangName: {
        english: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }, {
      multiLangName: {
        czech: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }]
  },
  include: {
    places: true,
    multiLangName: true
  }
});

// app/components/recent-search.tsx
var import_react56 = require("@remix-run/react");
var import_react57 = __toESM(require("react"));
var import_styled_components35 = __toESM(require("styled-components"));

// app/assets/icons/TableList.tsx
var TableListIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 160H128V96H64V160zM448 96H192V160H448V96zM64 288H128V224H64V288zM448 224H192V288H448V224zM64 416H128V352H64V416zM448 352H192V416H448V352z",
  fill: props.fill ?? styles.colors.black
}));
var TableList_default = TableListIcon;

// app/assets/icons/Tags.tsx
var TagsIcon = (props) => /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 512 512",
  style: {
    height: props.height
  },
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M472.8 168.4C525.1 221.4 525.1 306.6 472.8 359.6L360.8 472.9C351.5 482.3 336.3 482.4 326.9 473.1C317.4 463.8 317.4 448.6 326.7 439.1L438.6 325.9C472.5 291.6 472.5 236.4 438.6 202.1L310.9 72.87C301.5 63.44 301.6 48.25 311.1 38.93C320.5 29.61 335.7 29.7 344.1 39.13L472.8 168.4zM.0003 229.5V80C.0003 53.49 21.49 32 48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L410.7 218.7C435.7 243.7 435.7 284.3 410.7 309.3L277.3 442.7C252.3 467.7 211.7 467.7 186.7 442.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5L.0003 229.5zM112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112z",
  fill: props.fill ?? styles.colors.black
}));
var Tags_default = TagsIcon;

// app/components/recent-search.tsx
var Wrap18 = import_styled_components35.default.button`
  background-color: ${styles.colors.primary};
  border-radius: 0.5rem;
  cursor: pointer;
  display: block;
  border: none;
  text-align: start;
  color: white;
  padding: 1.125rem;
  margin: 0;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  & svg {
    flex-shrink: 0;
  }
  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 550px) {
    border-radius: 0;
  }
`;
var Title12 = import_styled_components35.default.h5`
  font-size: 1.25rem;
  margin: 0 0 1.1rem 0;
`;
var Grid = import_styled_components35.default.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, auto));
  @media (max-width: 450px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, minmax(0, auto));
  }
  gap: 1.25rem;
`;
var Flex6 = import_styled_components35.default.div`
  display: flex;
  align-items: center;
  gap: 0.8125rem;
`;
var Text6 = import_styled_components35.default.p`
  font-size: 1rem;
  margin: 0;
`;
var RecentSearch = ({ searchPhrase, location, categories, tags }) => {
  const { lang } = useLangs();
  const s = (0, import_react56.useSubmit)();
  const form = import_react57.default.useRef(null);
  return /* @__PURE__ */ import_react57.default.createElement(Wrap18, {
    onClick: () => {
      if (form.current) {
        s(form.current);
      }
    }
  }, /* @__PURE__ */ import_react57.default.createElement(import_react56.Form, {
    method: "get",
    action: "/search",
    ref: form
  }, /* @__PURE__ */ import_react57.default.createElement(IdInput, {
    name: "selectedLocation",
    value: (location == null ? void 0 : location.cityCountry) ?? ""
  }), categories.map((c) => /* @__PURE__ */ import_react57.default.createElement(IdInput, {
    key: c.id,
    value: c.id,
    name: "categories[]"
  })), tags.map((t) => /* @__PURE__ */ import_react57.default.createElement(IdInput, {
    key: t.id,
    value: t.id,
    name: "tags[]"
  })), /* @__PURE__ */ import_react57.default.createElement(IdInput, {
    name: "searchTerm",
    value: searchPhrase
  }), /* @__PURE__ */ import_react57.default.createElement(IdInput, {
    name: "dontSave",
    value: "1"
  })), /* @__PURE__ */ import_react57.default.createElement(Title12, null, searchPhrase != "" ? `"${searchPhrase}"` : categories.length == 1 ? categories[0].multiLangName && categories[0].multiLangName[lang] : "All Activities", " ", (location == null ? void 0 : location.multiLangCity) && `in ${location.multiLangCity[lang]}`), /* @__PURE__ */ import_react57.default.createElement(Grid, null, /* @__PURE__ */ import_react57.default.createElement(Flex6, null, (location == null ? void 0 : location.multiLangCity) && /* @__PURE__ */ import_react57.default.createElement(Location_default, {
    fill: styles.colors.white,
    height: "1.25rem"
  }), (location == null ? void 0 : location.multiLangCity) && (location == null ? void 0 : location.multiLangCity[lang]), ((location == null ? void 0 : location.multiLangCity) || (location == null ? void 0 : location.multiLangCountry)) && ",", " ", (location == null ? void 0 : location.multiLangCountry) && (location == null ? void 0 : location.multiLangCountry[lang])), /* @__PURE__ */ import_react57.default.createElement(Flex6, null, categories.length > 0 && /* @__PURE__ */ import_react57.default.createElement(TableList_default, {
    fill: styles.colors.white,
    height: "1.25rem"
  }), categories.map((c) => (c == null ? void 0 : c.multiLangName) ? c.multiLangName[lang] : "").join(", ")), /* @__PURE__ */ import_react57.default.createElement(Flex6, null, /* @__PURE__ */ import_react57.default.createElement(Search_default, {
    fill: styles.colors.white,
    height: "1.25rem"
  }), /* @__PURE__ */ import_react57.default.createElement(Text6, null, searchPhrase == "" ? /* @__PURE__ */ import_react57.default.createElement("i", null, "No search phrase") : searchPhrase)), /* @__PURE__ */ import_react57.default.createElement(Flex6, null, tags.length > 0 && /* @__PURE__ */ import_react57.default.createElement(Tags_default, {
    fill: styles.colors.white,
    height: "1.25rem"
  }), tags.map((t) => (t == null ? void 0 : t.multiLangName) ? t.multiLangName[lang] : "").join(", "))));
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/places.tsx
var loader13 = async ({ request }) => {
  var _a;
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm");
  const location = url.searchParams.get("selectedLocation");
  const tags = url.searchParams.getAll("tags[]");
  const categories = url.searchParams.getAll("categories[]");
  const usernameAndAdmin = await getUsernameAndAdmin(request);
  return (0, import_server_runtime12.json)({
    places: await getNewPlaces(),
    locations: await getAllLocations(),
    tags: await getTagList({ nameFragment: "" }),
    categories: await getCategoryList({ nameFragment: "" }),
    searchHistory: usernameAndAdmin.username ? (_a = await getSearchHistory({ username: usernameAndAdmin.username })) == null ? void 0 : _a.searchHistory : null
  });
};
var Title13 = import_styled_components36.default.h6`
  font-size: 2.625rem;
  @media (max-width: 800px) {
    font-size: 2rem;
  }
  @media (max-width: 550px) {
    padding: 0 1rem;
  }
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
  text-align: center;
  margin: 0 0 0.625rem 0;
  color: ${styles.colors.white};
`;
var TopSegment = import_styled_components36.default.div`
  padding: 2.45rem 0 2.375rem;
  @media (max-width: 800px) {
    padding: 1.45rem 0.75rem 2rem;
  }
  @media (max-width: 550px) {
    padding: 1.45rem 0rem 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${styles.colors.primary};
  overflow-x: hidden;
`;
var MainSegment = import_styled_components36.default.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
var WelcomeWrap = import_styled_components36.default.div`
  background-color: ${styles.colors.primary_background};
  @media (min-width: 550px) {
    border-radius: 1rem;
  }
  padding: 2rem;
  position: relative;
`;
var WelcomeTitle = import_styled_components36.default.h4`
  margin: 0 0 2rem 0;
  font-size: 1.3rem;
  font-size: 700;
`;
var SectionWrap2 = import_styled_components36.default.div`
`;
var SectionTitle2 = import_styled_components36.default.h4`
  margin: 2rem 0 2rem 2rem;
  font-size: 1.3rem;
  font-size: 700;
`;
var WelcomeText = import_styled_components36.default.p`
  margin: 0 0 1rem;
  font-weight: 500;
  font-size: 0.8rem;
`;
var HeartWrap = import_styled_components36.default.div`
  position: absolute;
  bottom: 1rem;
  right: 5rem;
  transform: rotate(35deg);
`;
var SearchHistory = import_styled_components36.default.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  gap: 1.25rem;
`;
var It = import_styled_components36.default.i`
  margin-left: 2rem;
`;
function Places() {
  const { places, locations, tags, categories, searchHistory } = (0, import_react58.useLoaderData)();
  const searchParams = (0, import_react58.useSearchParams)()[0];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TopSegment, null, /* @__PURE__ */ React.createElement(WidthRestrictor2, null, /* @__PURE__ */ React.createElement(Title13, null, "Book a spot anywhere. Right here."), /* @__PURE__ */ React.createElement(IconRow, null), /* @__PURE__ */ React.createElement(SearchUI, {
    searchParams,
    locations,
    tags,
    categories
  }))), /* @__PURE__ */ React.createElement(MainSegment, null, /* @__PURE__ */ React.createElement(WidthRestrictor2, null, /* @__PURE__ */ React.createElement(WelcomeWrap, null, /* @__PURE__ */ React.createElement(WelcomeTitle, null, "Figuring things out? Us too!"), /* @__PURE__ */ React.createElement(WelcomeText, null, "Our goal is to simplify booking activies, anywhere you are. But we are just getting started and we need your help to make it all happen."), /* @__PURE__ */ React.createElement(WelcomeText, null, "How can you help? Make a reservation. Or share this website with your friends and family. That\u2019s all we ask for."), /* @__PURE__ */ React.createElement(HeartWrap, null, /* @__PURE__ */ React.createElement(Heart_default, {
    height: "2.375rem",
    fill: styles.colors.action_light
  }))), searchHistory && /* @__PURE__ */ React.createElement(SectionWrap2, null, /* @__PURE__ */ React.createElement(SectionTitle2, null, "Your Recent Searches"), /* @__PURE__ */ React.createElement(SearchHistory, null, searchHistory.length == 0 ? /* @__PURE__ */ React.createElement(It, null, "You haven't yet searched for anything. Give it a try!") : null, searchHistory.map((s) => /* @__PURE__ */ React.createElement(RecentSearch, {
    key: s.id,
    searchPhrase: s.phrase,
    location: s.location,
    categories: s.Categories,
    tags: s.Tags
  })))), /* @__PURE__ */ React.createElement(SectionWrap2, null, /* @__PURE__ */ React.createElement(SectionTitle2, null, "Newly Listed Places"), places.filter((p) => !p.hidden).map((place) => /* @__PURE__ */ React.createElement(PlaceSummary, {
    place,
    key: place.id
  }))))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/search.tsx
var search_exports = {};
__export(search_exports, {
  default: () => Search,
  loader: () => loader14
});
var import_server_runtime13 = require("@remix-run/server-runtime");
var import_react59 = require("@remix-run/react");
var import_styled_components37 = __toESM(require("styled-components"));
var loader14 = async ({ request }) => {
  var _a;
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm");
  const location = url.searchParams.get("selectedLocation");
  const dontSave = url.searchParams.get("dontSave");
  const tags = url.searchParams.getAll("tags[]");
  const categories = url.searchParams.getAll("categories[]");
  const usernameAndAdmin = await getUsernameAndAdmin(request);
  if (usernameAndAdmin.username != null && dontSave != "1")
    await addToSearchHistory({
      username: usernameAndAdmin.username,
      phrase: searchTerm ?? "",
      locationId: location ? ((_a = await getLocationByName({ cityCountry: location })) == null ? void 0 : _a.id) ?? null : null,
      tagIds: tags,
      categoryIds: categories
    });
  return (0, import_server_runtime13.json)({
    places: await getPlaceList({ name: searchTerm ?? "", cityCountry: !location || location == "" ? void 0 : location, tagIds: tags, catIds: categories }),
    locations: await getAllLocations(),
    tags: await getTagList({ nameFragment: "" }),
    categories: await getCategoryList({ nameFragment: "" })
  });
};
var Title14 = import_styled_components37.default.h6`
  font-size: 1.7rem;
  margin: 0 0 1.5rem 0;
  @media (max-width: 800px) {
    padding: 0rem 2rem;
  }
`;
var TopSegment2 = import_styled_components37.default.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${styles.colors.primary};
`;
var MainSegment2 = import_styled_components37.default.div`
  padding: 3rem 0;
  display: grid;
  gap: 2rem;
  align-items: flex-start;
  grid-template-columns: 22rem 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
  }
`;
var PlacesColumn = import_styled_components37.default.div`
  flex-grow: 1;
`;
function Search() {
  const { places, locations, tags, categories } = (0, import_react59.useLoaderData)();
  console.log(places);
  const searchParams = (0, import_react59.useSearchParams)()[0];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TopSegment2, null, /* @__PURE__ */ React.createElement(IconRow, null)), /* @__PURE__ */ React.createElement(WidthRestrictor2, {
    width: "1368px"
  }, /* @__PURE__ */ React.createElement(MainSegment2, null, /* @__PURE__ */ React.createElement(SearchUI, {
    searchParams,
    locations,
    tags,
    categories,
    narrowView: true
  }), /* @__PURE__ */ React.createElement(PlacesColumn, null, /* @__PURE__ */ React.createElement(Title14, null, "Search Results"), places.filter((p) => !p.hidden).map((place) => /* @__PURE__ */ React.createElement(PlaceSummary, {
    place,
    key: place.id,
    inSearch: true
  }))))));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => About
});
var import_react60 = require("@remix-run/react");
function About() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Welcome to the best place in the world."), /* @__PURE__ */ React.createElement(import_react60.Link, {
    to: "/"
  }, "See place list."));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => Admin,
  loader: () => loader15
});
var import_react61 = require("@remix-run/react");
var import_server_runtime14 = require("@remix-run/server-runtime");
var import_styled_components38 = __toESM(require("styled-components"));
var forbidden = (data) => (0, import_server_runtime14.json)(data, { status: 403 });
var loader15 = async ({ request }) => {
  const { admin } = await requireUsernameAndAdmin(request);
  if (admin === true) {
    return {};
  }
  return forbidden({ forbidden: true });
};
var AdminHeader = import_styled_components38.default.div`
  background-color: ${styles.colors.gray[10]};
  display: flex;
  gap: 2rem;
`;
var TabButton = (0, import_styled_components38.default)(UnstyledLink2)`
  color: ${styles.colors.black};
  display: block;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
`;
function Admin() {
  return (0, import_react61.useLoaderData)().forbidden ? /* @__PURE__ */ React.createElement("div", null, "Iiii dont think ur an admin m8") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AdminHeader, null, /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/reservations"
  }, "Reservations"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/places"
  }, "Places"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/companies"
  }, "Companies"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/tags"
  }, "Tags"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/categories"
  }, "Categories"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/locations"
  }, "Locations"), /* @__PURE__ */ React.createElement(TabButton, {
    to: "/admin/reservableTypes"
  }, "Reservable types")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react61.Outlet, null)));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservableTypes/$reservableTypeId.tsx
var reservableTypeId_exports = {};
__export(reservableTypeId_exports, {
  action: () => action11,
  default: () => AdminReservableTypeDetail,
  loader: () => loader16
});
var import_react62 = require("@remix-run/react");
var import_server_runtime15 = require("@remix-run/server-runtime");
var import_styled_components39 = __toESM(require("styled-components"));

// app/models/reservableType.server.ts
var createReservableType = async ({ multiLangName }) => await prisma.reservableType.create({
  data: {
    multiLangName: {
      create: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var updateReservableType = async ({ id, multiLangName }) => await prisma.reservableType.update({
  where: {
    id
  },
  data: {
    multiLangName: {
      update: {
        czech: multiLangName.czech,
        english: multiLangName.english
      }
    }
  }
});
var getReservableType = async ({ id }) => await prisma.reservableType.findFirst({
  where: { id },
  include: {
    multiLangName: true
  }
});
var getReservableTypeList = async ({ nameFragment }) => await prisma.reservableType.findMany({
  where: {
    OR: [{
      multiLangName: {
        english: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }, {
      multiLangName: {
        czech: {
          contains: nameFragment ?? "",
          mode: "insensitive"
        }
      }
    }]
  },
  include: {
    multiLangName: true
  }
});

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservableTypes/$reservableTypeId.tsx
var loader16 = async ({ request, params }) => {
  if (!params.reservableTypeId)
    return (0, import_server_runtime15.json)({});
  const x = { reservableType: await getReservableType({ id: params.reservableTypeId }) };
  return (0, import_server_runtime15.json)({ reservableType: await getReservableType({ id: params.reservableTypeId }) });
};
var action11 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const reservableType = {
    id: "-1",
    czech: getFormItem("nameCzech"),
    english: getFormItem("nameEnglish")
  };
  await updateReservableType({ multiLangName: reservableType, id: getFormItem("id") });
  return (0, import_server_runtime15.redirect)("/admin/reservableTypes");
};
var ArrayInputWrap = import_styled_components39.default.div`
  display: flex;
`;
function AdminReservableTypeDetail() {
  var _a, _b;
  const { reservableType } = (0, import_react62.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "RESERVABLE TYPE ", (reservableType == null ? void 0 : reservableType.multiLangName) && (reservableType == null ? void 0 : reservableType.multiLangName[lang])), /* @__PURE__ */ React.createElement(import_react62.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: (reservableType == null ? void 0 : reservableType.id) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: ((_a = reservableType == null ? void 0 : reservableType.multiLangName) == null ? void 0 : _a.english) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: ((_b = reservableType == null ? void 0 : reservableType.multiLangName) == null ? void 0 : _b.czech) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservableTypes/index.tsx
var reservableTypes_exports = {};
__export(reservableTypes_exports, {
  default: () => CategoriesAdminIndex,
  loader: () => loader17
});
var import_react63 = require("@remix-run/react");
var loader17 = async ({ request, params }) => {
  const categories = await getReservableTypeList({ nameFragment: params.reservableTypeId ?? "" });
  return { categories };
};
function CategoriesAdminIndex() {
  const { categories } = (0, import_react63.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, categories.map((c) => /* @__PURE__ */ React.createElement("div", {
    key: c.id
  }, /* @__PURE__ */ React.createElement("p", null, "Name: ", c.multiLangName && c.multiLangName[lang]), /* @__PURE__ */ React.createElement(import_react63.Link, {
    to: `/admin/reservableTypes/${c.id}`
  }, "View / Edit"))), /* @__PURE__ */ React.createElement(import_react63.Link, {
    to: "/admin/reservableTypes/new"
  }, "New reservable type")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservableTypes/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action12,
  default: () => AdminCompanyDetail,
  loader: () => loader18
});
var import_react64 = require("@remix-run/react");
var import_server_runtime16 = require("@remix-run/server-runtime");
var loader18 = async ({ request, params }) => {
  return {};
};
var action12 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const reservableType = {
    id: "-1",
    czech: getFormItem("nameCzech"),
    english: getFormItem("nameEnglish")
  };
  if (!reservableType.english || !reservableType.czech) {
    return badRequest({ field: { nameCzech: reservableType.czech, nameEnglish: reservableType.english } });
  }
  await createReservableType({ multiLangName: reservableType });
  return (0, import_server_runtime16.redirect)("/admin/reservableTypes");
};
function AdminCompanyDetail() {
  var _a, _b, _c;
  const a = (0, import_react64.useActionData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "RESERVABLE TYPE ", ((_a = a == null ? void 0 : a.field) == null ? void 0 : _a.nameEnglish) ?? ""), /* @__PURE__ */ React.createElement(import_react64.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: "-1"
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: ((_b = a == null ? void 0 : a.field) == null ? void 0 : _b.nameCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: ((_c = a == null ? void 0 : a.field) == null ? void 0 : _c.nameEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservations.tsx
var reservations_exports = {};
__export(reservations_exports, {
  default: () => ReservationsAdmin
});
var import_react65 = require("@remix-run/react");
var import_styled_components40 = __toESM(require("styled-components"));
var Wrap19 = import_styled_components40.default.div`
  
`;
function ReservationsAdmin() {
  return /* @__PURE__ */ React.createElement(Wrap19, null, /* @__PURE__ */ React.createElement(import_react65.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservations/$reservationId.tsx
var reservationId_exports = {};
__export(reservationId_exports, {
  action: () => action13,
  default: () => EditReservation,
  loader: () => loader19
});
var import_react66 = require("@remix-run/react");
var import_server_runtime17 = require("@remix-run/server-runtime");
var import_react67 = __toESM(require("react"));
var import_styled_components41 = __toESM(require("styled-components"));
var loader19 = async ({ params }) => {
  const reservationGroupId = params.reservationId;
  const rGroup = await getReservationGroup({ id: reservationGroupId ?? "" });
  return { reservationGroup: rGroup };
};
var action13 = async ({ request }) => {
  var _a, _b, _c, _d;
  const form = await request.formData();
  const note = (_a = form.get("note")) == null ? void 0 : _a.toString();
  const placeId = (_b = form.get("placeId")) == null ? void 0 : _b.toString();
  const userId = (_c = form.get("userId")) == null ? void 0 : _c.toString();
  const rgId = (_d = form.get("rgId")) == null ? void 0 : _d.toString();
  const reservableId = form.getAll("reservableId[]").map((r) => r.toString());
  const reservationId = form.getAll("reservationId[]").map((r) => r.toString());
  const reservationBackup = form.getAll("reservationBackup[]").map((r) => r.toString());
  const dateTimeStart = form.getAll("start[]").map((r) => r.toString());
  const dateTimeEnd = form.getAll("end[]").map((r) => r.toString());
  if (!dateTimeEnd || !dateTimeStart || !note || !placeId || !userId || !reservableId || note == "") {
    return badRequest({
      fields: {
        note: note ?? "",
        placeId: placeId ?? "",
        userId: userId ?? ""
      },
      formError: "Fill everything in pls."
    });
  }
  const resGroup = await updateReservationGroup({ id: rgId ?? "", note, userId });
  const promises = [];
  dateTimeStart.forEach((d, i) => {
    if (reservationId[i] == "-1") {
      promises.push(createReservation({ backup: reservationBackup[i] == "1", start: new Date(dateTimeStart[i]), end: new Date(dateTimeEnd[i]), reservableId: reservableId[i] ?? null, reservationGroupId: resGroup.id ?? null }));
    } else {
      promises.push(updateReservation({ id: reservationId[i], backup: reservationBackup[i] == "1", start: new Date(dateTimeStart[i]), end: new Date(dateTimeEnd[i]), reservableId: reservableId[i] ?? null, reservationGroupId: resGroup.id ?? null }));
    }
  });
  resGroup.reservations.map((r) => r.id).forEach((id) => {
    if (!reservationId.includes(id)) {
      promises.push(deleteReservation({ id }));
    }
  });
  await Promise.all(promises);
  return (0, import_server_runtime17.redirect)(`/admin/reservations`);
};
var Title15 = import_styled_components41.default.h4`
  
`;
function EditReservation() {
  var _a;
  const { reservationGroup } = (0, import_react66.useLoaderData)();
  const [resList, setResList] = (0, import_react67.useState)([]);
  const place = (reservationGroup == null ? void 0 : reservationGroup.reservations) && reservationGroup.reservations.length > 0 ? (_a = reservationGroup == null ? void 0 : reservationGroup.reservations[0].reservable) == null ? void 0 : _a.place : null;
  const actionData = (0, import_react66.useActionData)();
  const [date, setDate] = import_react67.default.useState(null);
  return (reservationGroup == null ? void 0 : reservationGroup.userId) && place && /* @__PURE__ */ import_react67.default.createElement(import_react66.Form, {
    method: "post"
  }, /* @__PURE__ */ import_react67.default.createElement(Title15, null, "Edit reservation"), /* @__PURE__ */ import_react67.default.createElement(IdInput, {
    name: "userId",
    value: reservationGroup.userId
  }), /* @__PURE__ */ import_react67.default.createElement(IdInput, {
    name: "placeId",
    value: place.id
  }), /* @__PURE__ */ import_react67.default.createElement(IdInput, {
    name: "rgId",
    value: reservationGroup.id
  }), /* @__PURE__ */ import_react67.default.createElement(TextInput, {
    name: "note",
    title: "Note",
    defaultValue: reservationGroup.note
  }), /* @__PURE__ */ import_react67.default.createElement(DateInput, {
    name: "date",
    defaultValue: date,
    title: "Date",
    onChange: setDate
  }), date && (place == null ? void 0 : place.reservables) && /* @__PURE__ */ import_react67.default.createElement(ReservableTimes, {
    reservationBackupName: "reservationBackup[]",
    reservables: place.reservables,
    date,
    openingTime: place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)],
    startName: "start[]",
    endName: "end[]",
    reservableIdName: "reservableId[]",
    defaultReservationGroup: reservationGroup,
    reservationIdName: "reservationId[]",
    setResList
  }), /* @__PURE__ */ import_react67.default.createElement("p", null, "Backup timeslots (if any):"), date && (place == null ? void 0 : place.reservables) && /* @__PURE__ */ import_react67.default.createElement(ReservableTimes, {
    reservationBackupName: "reservationBackup[]",
    backup: true,
    reservables: place.reservables,
    date,
    openingTime: place.openingTimes.sort((a, b) => a.day - b.day)[getDayOfWeek(date)],
    startName: "start[]",
    endName: "end[]",
    reservableIdName: "reservableId[]",
    defaultReservationGroup: reservationGroup,
    reservationIdName: "reservationId[]",
    setResList
  }), (actionData == null ? void 0 : actionData.formError) && /* @__PURE__ */ import_react67.default.createElement("p", null, actionData.formError ?? ""), /* @__PURE__ */ import_react67.default.createElement("input", {
    type: "submit"
  }));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservations/index.tsx
var reservations_exports2 = {};
__export(reservations_exports2, {
  action: () => action14,
  default: () => ReservationAdminList,
  loader: () => loader20
});
var import_react70 = require("@remix-run/react");
var import_server_runtime18 = require("@remix-run/server-runtime");
var import_styled_components44 = __toESM(require("styled-components"));

// app/components/admin/reservation-group-summary.tsx
var import_react68 = require("@remix-run/react");
var import_react69 = __toESM(require("react"));
var import_styled_components43 = __toESM(require("styled-components"));

// app/components/admin/reservation-summary.tsx
var import_styled_components42 = __toESM(require("styled-components"));
var Wrap20 = import_styled_components42.default.div`
  display: flex;
  gap: 2rem;
`;
var Title16 = import_styled_components42.default.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 1rem;
  color: ${styles.colors.action};
`;
var Value4 = import_styled_components42.default.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;
var AdminReservationSummary = ({ reservation: r }) => {
  var _a, _b;
  return /* @__PURE__ */ React.createElement(Wrap20, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Place"), /* @__PURE__ */ React.createElement(Value4, null, (_a = r.reservable) == null ? void 0 : _a.place.name)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Facility"), /* @__PURE__ */ React.createElement(Value4, null, (_b = r.reservable) == null ? void 0 : _b.name)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Start"), /* @__PURE__ */ React.createElement(Value4, null, new Date(r.start).toLocaleDateString(), " - ", getStringTimeValue(new Date(r.start)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "End"), /* @__PURE__ */ React.createElement(Value4, null, new Date(r.end).toLocaleDateString(), " - ", getStringTimeValue(new Date(r.end)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Status"), /* @__PURE__ */ React.createElement(Value4, null, r.status == 0 /* AwaitingConfirmation */ ? "Awaiting confirmation" : r.status == 1 /* Confirmed */ ? "Confirmed" : r.status == 2 /* Rejected */ ? "Rejected" : r.status == 3 /* Cancelled */ ? "Cancelled" : r.status == 4 /* Paid */ ? "Paid" : r.status == 6 /* Past */ ? "Past" : "")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Previous Status"), /* @__PURE__ */ React.createElement(Value4, null, r.previousStatus == 0 /* AwaitingConfirmation */ ? "Awaiting confirmation" : r.previousStatus == 1 /* Confirmed */ ? "Confirmed" : r.previousStatus == 2 /* Rejected */ ? "Rejected" : r.previousStatus == 3 /* Cancelled */ ? "Cancelled" : r.previousStatus == 4 /* Paid */ ? "Paid" : r.previousStatus == 6 /* Past */ ? "Past" : "")), r.backup && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title16, null, "Backup"), /* @__PURE__ */ React.createElement(Value4, null, "This slot is a backup.")));
};

// app/components/admin/reservation-group-summary.tsx
var Title17 = import_styled_components43.default.h5`
  margin: 0;
  font-size: 1.2rem;
`;
var InfoTitle = import_styled_components43.default.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 1.5rem;
  color: ${styles.colors.action};
`;
var Value5 = import_styled_components43.default.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;
var SummaryInfoWrap = import_styled_components43.default.div`
  display: flex;
  gap: 2rem;
`;
var Wrap21 = import_styled_components43.default.div`
  display: flex;
  overflow: hidden;
  transition:
    height 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    padding 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    margin 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  box-shadow: ${styles.shadows[0]};
  border-radius: 0.6rem;
  background-color: ${styles.colors.white};
  padding: 1.3rem 1rem;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1rem;
  &>* {
    flex-shrink: 0;
  }
`;
var UpdateStatus = import_styled_components43.default.button`
  display: block;
  margin: 1rem 0rem;
`;
var InnerWrap4 = import_styled_components43.default.div`
`;
var AdminReservationGroupSummary = ({ reservationGroup: rg }) => {
  var _a;
  const ref = import_react69.default.useRef(null);
  const actions = [{
    text: "Confirm preferred",
    value: "confirm_preferred"
  }, {
    text: "Set as unavailable",
    value: "unavailable"
  }];
  if (!!rg.reservations.find((r) => r.backup)) {
    actions.push({
      text: "Confirm backup",
      value: "confirm_backup"
    });
  }
  return /* @__PURE__ */ import_react69.default.createElement(import_react69.default.Fragment, null, /* @__PURE__ */ import_react69.default.createElement(Wrap21, {
    key: rg.id,
    ref
  }, /* @__PURE__ */ import_react69.default.createElement(InnerWrap4, null, /* @__PURE__ */ import_react69.default.createElement(Title17, null, (_a = rg.user) == null ? void 0 : _a.username), rg.reservations.map((r) => /* @__PURE__ */ import_react69.default.createElement("div", {
    key: r.id
  }, /* @__PURE__ */ import_react69.default.createElement(AdminReservationSummary, {
    reservation: r
  }))), /* @__PURE__ */ import_react69.default.createElement(SummaryInfoWrap, null, /* @__PURE__ */ import_react69.default.createElement("div", null, /* @__PURE__ */ import_react69.default.createElement(InfoTitle, null, "Created"), /* @__PURE__ */ import_react69.default.createElement(Value5, null, new Date(rg.createdAt).toDateString(), ", ", new Date(rg.createdAt).toTimeString())), /* @__PURE__ */ import_react69.default.createElement("div", null, /* @__PURE__ */ import_react69.default.createElement(InfoTitle, null, "Note to business"), /* @__PURE__ */ import_react69.default.createElement(Value5, null, rg.note))), rg.reservations.length > 0 && !rg.reservations.find((r) => r.status == 3 /* Cancelled */ || r.status == 1 /* Confirmed */ || r.status == 2 /* Rejected */) && /* @__PURE__ */ import_react69.default.createElement(import_react68.Form, {
    method: "post",
    action: "/admin/reservations?index"
  }, /* @__PURE__ */ import_react69.default.createElement(SingleSelectorInput, {
    name: "action",
    possibleValuesAndTexts: actions,
    defaultValueAndText: null
  }), /* @__PURE__ */ import_react69.default.createElement(IdInput, {
    name: "rgId",
    value: rg.id
  }), /* @__PURE__ */ import_react69.default.createElement("p", null, 'Select a status in the input above and then hit "Update status". This WILL SEND AN EMAIL to the user!'), /* @__PURE__ */ import_react69.default.createElement(UpdateStatus, null, "Update status")), /* @__PURE__ */ import_react69.default.createElement(import_react68.Link, {
    to: `/admin/reservations/${rg.id}`
  }, "Edit"))));
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/reservations/index.tsx
var loader20 = async () => {
  const reservationGroups = await getReservationGroupList();
  return (0, import_server_runtime18.json)({ reservationGroups });
};
var action14 = async ({ request }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const formData = await request.formData();
  const reservationGroupId = (_a = formData.get("rgId")) == null ? void 0 : _a.toString();
  const action25 = (_b = formData.get("action")) == null ? void 0 : _b.toString();
  console.log("what dont we have");
  if (!reservationGroupId || !action25) {
    return {};
  }
  const reservationGroup = await getReservationGroupForConfirmationEmail({ id: reservationGroupId });
  const promises = [];
  console.log(reservationGroup);
  reservationGroup == null ? void 0 : reservationGroup.reservations.forEach((r) => {
    console.log("r");
    if (action25 == "confirm_preferred") {
      if (!r.backup) {
        promises.push(setStatusOfReservation({ id: r.id, status: 1 /* Confirmed */ }));
      } else {
        promises.push(setStatusOfReservation({ id: r.id, status: 3 /* Cancelled */ }));
      }
    } else if (action25 == "unavailable") {
      promises.push(setStatusOfReservation({ id: r.id, status: 2 /* Rejected */ }));
    } else if (action25 == "confirm_backup") {
      if (r.backup) {
        promises.push(setStatusOfReservation({ id: r.id, status: 1 /* Confirmed */ }));
      } else {
        promises.push(setStatusOfReservation({ id: r.id, status: 2 /* Rejected */ }));
      }
    }
  });
  await Promise.all(promises);
  if ((reservationGroup == null ? void 0 : reservationGroup.user) && ((_c = reservationGroup == null ? void 0 : reservationGroup.reservations[0].reservable) == null ? void 0 : _c.place)) {
    if (action25 == "confirm_preferred") {
      await sendStatusUpdateEmail((_d = reservationGroup == null ? void 0 : reservationGroup.user) == null ? void 0 : _d.email, "confirm_preferred", (_e = reservationGroup == null ? void 0 : reservationGroup.reservations[0].reservable) == null ? void 0 : _e.place, reservationGroup.reservations[0].start);
    } else if (action25 == "unavailable") {
      await sendStatusUpdateEmail((_f = reservationGroup == null ? void 0 : reservationGroup.user) == null ? void 0 : _f.email, "unavailable", (_g = reservationGroup == null ? void 0 : reservationGroup.reservations[0].reservable) == null ? void 0 : _g.place, reservationGroup.reservations[0].start);
    } else if (action25 == "confirm_backup") {
      await sendStatusUpdateEmail((_h = reservationGroup == null ? void 0 : reservationGroup.user) == null ? void 0 : _h.email, "confirm_backup", (_i = reservationGroup == null ? void 0 : reservationGroup.reservations[0].reservable) == null ? void 0 : _i.place, reservationGroup.reservations[0].start);
    }
  }
  return {};
};
var Title18 = import_styled_components44.default.h4`
  
`;
function ReservationAdminList() {
  const { reservationGroups } = (0, import_react70.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title18, null, "Reservations"), reservationGroups.map((rg) => /* @__PURE__ */ React.createElement(AdminReservationGroupSummary, {
    key: rg.id,
    reservationGroup: rg
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/categories.tsx
var categories_exports = {};
__export(categories_exports, {
  default: () => CompaniesAdmin,
  loader: () => loader21
});
var import_react71 = require("@remix-run/react");
var loader21 = async ({ request, params }) => {
  return {};
};
function CompaniesAdmin() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "CATEGORY ADMIN"), /* @__PURE__ */ React.createElement(import_react71.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/categories/$categoryId.tsx
var categoryId_exports = {};
__export(categoryId_exports, {
  action: () => action15,
  default: () => AdminCategoryDetail,
  loader: () => loader22
});
var import_react72 = require("@remix-run/react");
var import_server_runtime19 = require("@remix-run/server-runtime");
var import_styled_components45 = __toESM(require("styled-components"));
var loader22 = async ({ request, params }) => {
  if (!params.categoryId)
    return (0, import_server_runtime19.json)({});
  const x = { category: await getCategory({ id: params.categoryId }) };
  return (0, import_server_runtime19.json)({ category: await getCategory({ id: params.categoryId }) });
};
var action15 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const category = {
    id: "-1",
    czech: getFormItem("nameCzech"),
    english: getFormItem("nameEnglish")
  };
  await updateCategory({ multiLangName: category, id: getFormItem("id") });
  return (0, import_server_runtime19.redirect)("/admin/categories");
};
var ArrayInputWrap2 = import_styled_components45.default.div`
  display: flex;
`;
function AdminCategoryDetail() {
  var _a, _b;
  const { category } = (0, import_react72.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "CATEGORY ", (category == null ? void 0 : category.multiLangName) && (category == null ? void 0 : category.multiLangName[lang])), /* @__PURE__ */ React.createElement(import_react72.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: (category == null ? void 0 : category.id) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: ((_a = category == null ? void 0 : category.multiLangName) == null ? void 0 : _a.english) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: ((_b = category == null ? void 0 : category.multiLangName) == null ? void 0 : _b.czech) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/categories/index.tsx
var categories_exports2 = {};
__export(categories_exports2, {
  default: () => CategoriesAdminIndex2,
  loader: () => loader23
});
var import_react73 = require("@remix-run/react");
var loader23 = async ({ request, params }) => {
  const categories = await getCategoryList({ nameFragment: params.categoryId ?? "" });
  return { categories };
};
function CategoriesAdminIndex2() {
  const { categories } = (0, import_react73.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, categories.map((c) => /* @__PURE__ */ React.createElement("div", {
    key: c.id
  }, /* @__PURE__ */ React.createElement("p", null, "Name: ", c.multiLangName && c.multiLangName[lang]), /* @__PURE__ */ React.createElement(import_react73.Link, {
    to: `/admin/categories/${c.id}`
  }, "View / Edit"))), /* @__PURE__ */ React.createElement(import_react73.Link, {
    to: "/admin/categories/new"
  }, "New category")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/categories/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  action: () => action16,
  default: () => AdminCompanyDetail2,
  loader: () => loader24
});
var import_react74 = require("@remix-run/react");
var import_server_runtime20 = require("@remix-run/server-runtime");
var import_styled_components46 = __toESM(require("styled-components"));
var loader24 = async ({ request, params }) => {
  return {};
};
var action16 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const category = {
    id: "-1",
    czech: getFormItem("nameCzech"),
    english: getFormItem("nameEnglish")
  };
  if (!category.english || !category.czech) {
    return badRequest({ field: { nameCzech: category.czech, nameEnglish: category.english } });
  }
  await createCategory({ multiLangName: category });
  return (0, import_server_runtime20.redirect)("/admin/categories");
};
var ArrayInputWrap3 = import_styled_components46.default.div`
  display: flex;
`;
function AdminCompanyDetail2() {
  var _a, _b, _c;
  const a = (0, import_react74.useActionData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "CATEGORY ", ((_a = a == null ? void 0 : a.field) == null ? void 0 : _a.nameEnglish) ?? ""), /* @__PURE__ */ React.createElement(import_react74.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: "-1"
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: ((_b = a == null ? void 0 : a.field) == null ? void 0 : _b.nameCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: ((_c = a == null ? void 0 : a.field) == null ? void 0 : _c.nameEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/companies.tsx
var companies_exports = {};
__export(companies_exports, {
  default: () => CompaniesAdmin2,
  loader: () => loader25
});
var import_react75 = require("@remix-run/react");
var loader25 = async ({ request, params }) => {
  return {};
};
function CompaniesAdmin2() {
  const { companies } = (0, import_react75.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "COMPANY ADMIN"), /* @__PURE__ */ React.createElement(import_react75.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/companies/$companyId.tsx
var companyId_exports = {};
__export(companyId_exports, {
  action: () => action17,
  default: () => AdminCompanyDetail3,
  loader: () => loader26
});
var import_react76 = require("@remix-run/react");
var import_server_runtime21 = require("@remix-run/server-runtime");
var import_react77 = require("react");
var import_styled_components47 = __toESM(require("styled-components"));

// app/models/company.server.ts
var getCompany = async ({ id }) => await prisma.company.findFirst({
  where: { id },
  include: {
    places: true
  }
});
var getCompanyList = async ({ name: nameFragment }) => await prisma.company.findMany({
  where: { name: { contains: nameFragment, mode: "insensitive" } },
  include: {
    places: true
  }
});
var createCompany = async ({ name: name3 }) => await prisma.company.create({
  data: {
    name: name3
  }
});
var updateCompany = async ({ id, name: name3 }) => await prisma.company.update({
  where: {
    id
  },
  data: {
    name: name3
  }
});

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/companies/$companyId.tsx
var loader26 = async ({ request, params }) => {
  if (!params.companyId)
    return (0, import_server_runtime21.json)({});
  const x = { company: await getCompany({ id: params.companyId }) };
  return (0, import_server_runtime21.json)({ company: await getCompany({ id: params.companyId }) });
};
var action17 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const company = {
    id: getFormItem("id"),
    name: getFormItem("name")
  };
  await updateCompany(company);
  return (0, import_server_runtime21.redirect)("/admin/companies");
};
var ArrayInputWrap4 = import_styled_components47.default.div`
  display: flex;
`;
function AdminCompanyDetail3() {
  const { company: defaultPlace } = (0, import_react76.useLoaderData)();
  const [company, setCompany] = (0, import_react77.useState)(defaultPlace);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "COMPANY ", company.name), /* @__PURE__ */ React.createElement(import_react76.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: company == null ? void 0 : company.id
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "name",
    title: "Name",
    defaultValue: company == null ? void 0 : company.name
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/companies/index.tsx
var companies_exports2 = {};
__export(companies_exports2, {
  default: () => CompaniesAdminIndex,
  loader: () => loader27
});
var import_react78 = require("@remix-run/react");
var loader27 = async ({ request, params }) => {
  const companies = await getCompanyList({ name: params.companyId ?? "" });
  return { companies };
};
function CompaniesAdminIndex() {
  const { companies } = (0, import_react78.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, companies.map((c) => /* @__PURE__ */ React.createElement("div", {
    key: c.id
  }, /* @__PURE__ */ React.createElement("p", null, "Name: ", c.name), /* @__PURE__ */ React.createElement(import_react78.Link, {
    to: `/admin/companies/${c.id}`
  }, "View / Edit"))), /* @__PURE__ */ React.createElement(import_react78.Link, {
    to: "/admin/companies/new"
  }, "New company")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/companies/new.tsx
var new_exports3 = {};
__export(new_exports3, {
  action: () => action18,
  default: () => AdminCompanyDetail4,
  loader: () => loader28
});
var import_react79 = require("@remix-run/react");
var import_server_runtime22 = require("@remix-run/server-runtime");
var import_styled_components48 = __toESM(require("styled-components"));
var loader28 = async ({ request, params }) => {
  return {};
};
var action18 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const company = {
    id: getFormItem("id"),
    name: getFormItem("name")
  };
  if (!company.id || !company.name) {
    return badRequest({ field: { name: company.name } });
  }
  await createCompany(company);
  return (0, import_server_runtime22.redirect)("/admin/companies");
};
var ArrayInputWrap5 = import_styled_components48.default.div`
  display: flex;
`;
function AdminCompanyDetail4() {
  var _a;
  const a = (0, import_react79.useActionData)();
  const company = { id: "-1", name: (_a = a == null ? void 0 : a.field) == null ? void 0 : _a.name };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "COMPANY ", company.name), /* @__PURE__ */ React.createElement(import_react79.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: "-1"
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "name",
    title: "Name",
    defaultValue: company.name ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/locations.tsx
var locations_exports = {};
__export(locations_exports, {
  default: () => TagAdmin,
  loader: () => loader29
});
var import_react80 = require("@remix-run/react");
var loader29 = async ({ request, params }) => {
  return {};
};
function TagAdmin() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "LOCATION ADMIN"), /* @__PURE__ */ React.createElement(import_react80.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/locations/$locationId.tsx
var locationId_exports = {};
__export(locationId_exports, {
  action: () => action19,
  default: () => AdminLocationDetail,
  loader: () => loader30
});
var import_react81 = require("@remix-run/react");
var import_server_runtime23 = require("@remix-run/server-runtime");
var import_styled_components49 = __toESM(require("styled-components"));
var loader30 = async ({ request, params }) => {
  if (!params.locationId)
    return (0, import_server_runtime23.json)({});
  return (0, import_server_runtime23.json)({ location: await getLocation({ id: params.locationId }) });
};
var action19 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const location = {
    id: getFormItem("id"),
    multiLangCity: {
      id: "-1",
      czech: getFormItem("cityCzech"),
      english: getFormItem("cityEnglish")
    },
    multiLangCountry: {
      id: "-1",
      czech: getFormItem("countryCzech"),
      english: getFormItem("countryEnglish")
    }
  };
  console.log("just before update");
  console.log(location);
  await updateLocation(location);
  return (0, import_server_runtime23.redirect)("/admin/locations");
};
var ArrayInputWrap6 = import_styled_components49.default.div`
  display: flex;
`;
function AdminLocationDetail() {
  var _a, _b, _c, _d;
  const { location } = (0, import_react81.useLoaderData)();
  const { lang } = useLangs();
  return location && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "LOCATION: ", (location == null ? void 0 : location.multiLangCity) && (location == null ? void 0 : location.multiLangCity[lang]), " in ", (location == null ? void 0 : location.multiLangCountry) && (location == null ? void 0 : location.multiLangCountry[lang])), /* @__PURE__ */ React.createElement(import_react81.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: location == null ? void 0 : location.id
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "cityCzech",
    title: "City (Czech)",
    defaultValue: ((_a = location == null ? void 0 : location.multiLangCity) == null ? void 0 : _a.czech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "countryCzech",
    title: "Country (Czech)",
    defaultValue: ((_b = location == null ? void 0 : location.multiLangCountry) == null ? void 0 : _b.czech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "cityEnglish",
    title: "City (English)",
    defaultValue: ((_c = location == null ? void 0 : location.multiLangCity) == null ? void 0 : _c.english) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "countryEnglish",
    title: "Country (English)",
    defaultValue: ((_d = location == null ? void 0 : location.multiLangCountry) == null ? void 0 : _d.english) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/locations/index.tsx
var locations_exports2 = {};
__export(locations_exports2, {
  default: () => CompaniesAdminIndex2,
  loader: () => loader31
});
var import_react82 = require("@remix-run/react");
var loader31 = async ({ request, params }) => {
  const locations = await getAllLocations();
  return { locations };
};
function CompaniesAdminIndex2() {
  const { locations } = (0, import_react82.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, locations.map((l) => /* @__PURE__ */ React.createElement("div", {
    key: l.id
  }, /* @__PURE__ */ React.createElement("p", null, "City: ", l.multiLangCity && l.multiLangCity[lang]), /* @__PURE__ */ React.createElement("p", null, "Country: ", l.multiLangCountry && l.multiLangCountry[lang]), /* @__PURE__ */ React.createElement(import_react82.Link, {
    to: `/admin/locations/${l.id}`
  }, "View / Edit"))), /* @__PURE__ */ React.createElement(import_react82.Link, {
    to: "/admin/locations/new"
  }, "New location")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/locations/new.tsx
var new_exports4 = {};
__export(new_exports4, {
  action: () => action20,
  default: () => AdminLocationNew,
  loader: () => loader32
});
var import_react83 = require("@remix-run/react");
var import_server_runtime24 = require("@remix-run/server-runtime");
var import_styled_components50 = __toESM(require("styled-components"));
var loader32 = async ({ request, params }) => {
  return {};
};
var action20 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const location = {
    multiLangCity: {
      id: "-1",
      czech: getFormItem("cityCzech"),
      english: getFormItem("cityEnglish")
    },
    multiLangCountry: {
      id: "-1",
      czech: getFormItem("countryCzech"),
      english: getFormItem("countryEnglish")
    }
  };
  if (!location.multiLangCity.czech || !location.multiLangCity.english || !location.multiLangCountry.czech || !location.multiLangCountry.english) {
    return badRequest({ field: {
      cityCzech: location.multiLangCity.czech,
      countryCzech: location.multiLangCountry.czech,
      cityEnglish: location.multiLangCity.english,
      countryEnglish: location.multiLangCountry.english
    } });
  }
  await createLocation(location);
  return (0, import_server_runtime24.redirect)("/admin/locations");
};
var ArrayInputWrap7 = import_styled_components50.default.div`
  display: flex;
`;
function AdminLocationNew() {
  var _a, _b, _c, _d, _e;
  const a = (0, import_react83.useActionData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "TAG ", (_a = a == null ? void 0 : a.field) == null ? void 0 : _a.cityEnglish), /* @__PURE__ */ React.createElement(import_react83.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: "-1"
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "cityCzech",
    title: "City (Czech)",
    defaultValue: ((_b = a == null ? void 0 : a.field) == null ? void 0 : _b.cityCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "countryCzech",
    title: "Country (Czech)",
    defaultValue: ((_c = a == null ? void 0 : a.field) == null ? void 0 : _c.countryCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "cityEnglish",
    title: "City (English)",
    defaultValue: ((_d = a == null ? void 0 : a.field) == null ? void 0 : _d.cityEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "countryEnglish",
    title: "Country (English)",
    defaultValue: ((_e = a == null ? void 0 : a.field) == null ? void 0 : _e.countryEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/places.tsx
var places_exports2 = {};
__export(places_exports2, {
  default: () => PlacesAdmin,
  loader: () => loader33
});
var import_react84 = require("@remix-run/react");
var loader33 = async () => {
  return {};
};
function PlacesAdmin() {
  const { places } = (0, import_react84.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "PLACE ADMIN"), /* @__PURE__ */ React.createElement(import_react84.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/places/$placeId.tsx
var placeId_exports3 = {};
__export(placeId_exports3, {
  action: () => action21,
  default: () => AdminPlaceDetail,
  loader: () => loader34
});
var import_node5 = require("@remix-run/node");
var import_react89 = require("@remix-run/react");
var import_server_runtime25 = require("@remix-run/server-runtime");
var import_react90 = __toESM(require("react"));
var import_react91 = require("react");
var import_styled_components54 = __toESM(require("styled-components"));

// app/components/button.tsx
var import_styled_components51 = __toESM(require("styled-components"));
var ButtonWrap2 = import_styled_components51.default.button`

`;
var Button2 = ({ children, onClick }) => /* @__PURE__ */ React.createElement(ButtonWrap2, {
  onClick: (e) => {
    e.preventDefault();
    onClick(e);
  }
}, children);

// app/components/inputs/ArrayInput.tsx
var import_react85 = __toESM(require("react"));
var ArrayInput = ({ onAdd, deletedIdsName, deletedIds, arrayTitle, children, addButtonText }) => {
  return /* @__PURE__ */ import_react85.default.createElement("div", null, /* @__PURE__ */ import_react85.default.createElement("label", null, arrayTitle), deletedIdsName && deletedIds ? deletedIds.map((id) => /* @__PURE__ */ import_react85.default.createElement("input", {
    key: id,
    name: deletedIdsName,
    type: "text",
    readOnly: true,
    value: id,
    hidden: true
  })) : null, children, onAdd && addButtonText && /* @__PURE__ */ import_react85.default.createElement("button", {
    onClick: (e) => {
      e.preventDefault();
      onAdd(e);
    }
  }, addButtonText));
};

// app/components/inputs/ImageInput.tsx
var import_react86 = __toESM(require("react"));
var ImageInput = ({ name: name3, hidden, onChange }) => {
  const [hasValue, setHasValue] = (0, import_react86.useState)(false);
  return /* @__PURE__ */ import_react86.default.createElement("div", {
    style: { visibility: hidden ? "hidden" : "visible" }
  }, /* @__PURE__ */ import_react86.default.createElement("input", {
    type: "file",
    name: hasValue ? name3 : "",
    accept: ".png,.jpg,.jpeg,.webp,.gif",
    onChange: (e) => {
      setHasValue(e.currentTarget.value != null && e.currentTarget.value != "");
      if (onChange)
        onChange(e.currentTarget.value);
    }
  }));
};

// app/components/inputs/NumberInput.tsx
var import_react87 = __toESM(require("react"));
var import_styled_components52 = __toESM(require("styled-components"));
var NumberInputField = import_styled_components52.default.input`
  font-size: 0.8rem;
  line-height: 2rem;
  padding: 0rem 1rem;
  border: 1.5px solid ${styles.colors.gray[30]};
  border-radius: 0.3rem;
  outline: none;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
  }
`;
var NumberInput = ({ name: name3, title, defaultValue }) => {
  const [value, setValue] = import_react87.default.useState(defaultValue);
  return /* @__PURE__ */ import_react87.default.createElement("div", null, /* @__PURE__ */ import_react87.default.createElement("label", null, title), /* @__PURE__ */ import_react87.default.createElement(NumberInputField, {
    type: "text",
    value: (value == null ? void 0 : value.toString()) ?? "",
    onChange: (e) => {
      if (e.currentTarget.value == "") {
        setValue(null);
      } else if (!isNaN(parseInt(e.currentTarget.value))) {
        setValue(parseInt(e.currentTarget.value));
      }
    }
  }), /* @__PURE__ */ import_react87.default.createElement("input", {
    name: name3,
    type: "number",
    readOnly: true,
    value: value ?? "",
    hidden: true
  }));
};

// app/components/inputs/TimeInput.tsx
var import_react88 = __toESM(require("react"));
var import_styled_components53 = __toESM(require("styled-components"));
var isTimePossible = (value) => {
  return /^(?:(?:[0-1]|$)(?:\d|$)|(?:[2]|$)(?:[0-3]|$))(?::|$)(?:(?:[0-5]|$)(?:\d|$))$/.test(value);
};
var isTimeValid = (value) => {
  return /^(?:(?:[0-1])(?:\d)|(?:[2])(?:[0-3]))(?::)(?:(?:[0-5])(?:\d))$/.test(value);
};
var TimeInputField = import_styled_components53.default.input`
  font-size: 0.8rem;
  line-height: 2rem;
  padding: 0rem 1rem;
  border: 1.5px solid ${styles.colors.gray[30]};
  border-radius: 0.3rem;
  outline: none;
  width: 5ch;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
  }
`;
var TimeInput = ({ name: name3, defaultValue, title }) => {
  const [value, setValue] = import_react88.default.useState(defaultValue ? getStringTimeValue(defaultValue) : "");
  const [isValid, setIsValid] = import_react88.default.useState(isTimeValid(value));
  import_react88.default.useEffect(() => {
    setIsValid(isTimeValid(value));
  }, [value]);
  return /* @__PURE__ */ import_react88.default.createElement("div", null, /* @__PURE__ */ import_react88.default.createElement("label", null, title), /* @__PURE__ */ import_react88.default.createElement(TimeInputField, {
    type: "text",
    value,
    onChange: (e) => {
      if (isTimePossible(e.currentTarget.value))
        setValue(e.currentTarget.value);
    }
  }), /* @__PURE__ */ import_react88.default.createElement("input", {
    name: name3,
    type: "time",
    readOnly: true,
    value,
    hidden: true
  }));
};

// app/models/openingTime.server.ts
var createOpeningTime = async ({ placeId, day, open, close }) => await prisma.openingTime.create({
  data: {
    placeId,
    day,
    open,
    close
  }
});
var updateOpeningTime = async ({ id, open, close }) => await prisma.openingTime.update({
  where: {
    id
  },
  data: {
    open,
    close
  }
});

// app/models/reservable.server.ts
var createReservable = async ({
  placeId,
  name: name3,
  minimumReservationTime,
  reservationsPerSlot,
  reservableTypeId,
  reservableDaysAhead
}) => await prisma.reservable.create({
  data: {
    placeId,
    name: name3,
    minimumReservationTime,
    reservationsPerSlot,
    reservableTypeId,
    reservableDaysAhead
  }
});
var updateReservable = async ({
  id,
  placeId,
  name: name3,
  minimumReservationTime,
  reservationsPerSlot,
  reservableTypeId,
  reservableDaysAhead
}) => await prisma.reservable.update({
  where: {
    id
  },
  data: {
    placeId,
    name: name3,
    minimumReservationTime,
    reservationsPerSlot,
    reservableTypeId,
    reservableDaysAhead
  }
});
var deleteReservable = ({ id }) => prisma.reservable.deleteMany({
  where: { id }
});

// app/utils/s3.server.ts
var uploadImageToS3 = async (image, fileName) => {
  const params = {
    Bucket: "reserveroobucket",
    Body: new Uint8Array(await image.arrayBuffer()),
    Key: fileName
  };
  return (await s3.upload(params).promise()).Location;
};
var deleteImageFromS3 = async (key) => {
  const params = {
    Bucket: "reserveroobucket",
    Key: key
  };
  return await s3.deleteObject(params).promise();
};

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/places/$placeId.tsx
var import_crypto3 = __toESM(require("crypto"));
var loader34 = async ({ request, params }) => {
  if (!params.placeId)
    return (0, import_server_runtime25.json)({});
  return (0, import_server_runtime25.json)({
    place: await getPlace({ id: params.placeId }),
    companies: await getCompanyList({ name: "" }),
    tags: await getTagList({ nameFragment: "" }),
    categories: await getCategoryList({ nameFragment: "" }),
    reservableTypes: await getReservableTypeList({ nameFragment: "" }),
    locations: await getLocationList({ cityCountry: "" })
  });
};
var action21 = async ({ request }) => {
  const getFormItem = (name3) => {
    var _a;
    return ((_a = imgForm.get(name3)) == null ? void 0 : _a.toString()) ?? "";
  };
  const getFormItems = (key) => imgForm.getAll(key).map((r) => r.toString());
  const uploadHandlerY = (0, import_node5.unstable_createMemoryUploadHandler)({
    maxFileSize: 5e5
  });
  const imgForm = await (0, import_node5.unstable_parseMultipartFormData)(request, uploadHandlerY);
  const profilePic = imgForm.get("profilePic");
  const galleryPics = imgForm.getAll("galleryPic[]");
  console.log(profilePic);
  console.log(galleryPics);
  const extension = profilePic ? profilePic.name.split(".")[profilePic.name.split(".").length - 1] : "";
  const acceptableTypes = ["jpeg", "jpg", "png", "webp", "gif"];
  const profilePicUrl = acceptableTypes.includes(extension) ? await uploadImageToS3(profilePic, `${import_crypto3.default.randomUUID()}.${extension}`) : "";
  const galleryPicUrlPromises = [];
  galleryPics.forEach((p) => {
    const extensionG = p.name.split(".")[p.name.split(".").length - 1];
    const acceptableTypes2 = ["jpeg", "jpg", "png", "webp", "gif"];
    if (!acceptableTypes2.includes(extensionG)) {
      return;
    }
    galleryPicUrlPromises.push(uploadImageToS3(p, `${import_crypto3.default.randomUUID()}.${extensionG}`));
  });
  const galleryPicUrls = await Promise.all(galleryPicUrlPromises);
  console.log(profilePicUrl);
  console.log(galleryPicUrls);
  const place = {
    id: getFormItem("id"),
    name: getFormItem("name"),
    description: getFormItem("description"),
    companyId: getFormItem("companyId"),
    hidden: getFormItem("hidden") == "1",
    addedTagIds: getFormItems("addedTagIds[]"),
    removedTagIds: getFormItems("removedTagIds[]"),
    addedCategoryIds: getFormItems("addedCategoryIds[]"),
    removedCategoryIds: getFormItems("removedCategoryIds[]"),
    locationId: getFormItem("locationId"),
    street: getFormItem("street"),
    city: getFormItem("city"),
    postCode: getFormItem("postCode"),
    howToGetThere: getFormItem("howToGetThere")
  };
  const reservables = getFormItems("reservableId[]").map((id, i) => {
    return {
      id,
      name: getFormItems("reservableName[]")[i],
      reservableTypeId: getFormItems("reservableTypeId[]")[i],
      minimumReservationTime: parseInt(getFormItems("minimumReservationTime[]")[i]),
      reservationsPerSlot: parseInt(getFormItems("reservationsPerSlot[]")[i]),
      reservableDaysAhead: parseInt(getFormItems("reservableDaysAhead[]")[i]),
      placeId: place.id
    };
  });
  const openingTimes = getFormItems("openingTime[]").map((id, i) => {
    return {
      id,
      open: getDateObjectFromTimeString(getFormItems("open[]")[i]),
      close: getDateObjectFromTimeString(getFormItems("close[]")[i]),
      day: parseInt(getFormItems("day[]")[i])
    };
  });
  const deletedReservableIds = getFormItems("deletedReservable[]");
  const deletedGalleryPicUrls = getFormItems("deletedGalleryPicUrls[]");
  const keysToDelete = deletedGalleryPicUrls.map((u) => u.split("/")[u.split("/").length - 1]);
  const promises = [
    ...reservables.map((r) => r.id == "-1" ? createReservable(r) : updateReservable(r)),
    ...openingTimes.sort((a, b) => a.day - b.day).map((ot) => updateOpeningTime(ot)),
    ...deletedReservableIds.map((id) => deleteReservable({ id })),
    updatePlace(place)
  ];
  if (profilePicUrl && profilePicUrl != "")
    promises.push(updatePlaceProfilePic({ id: place.id, profilePicUrl }));
  if (galleryPicUrls && galleryPicUrls.length > 0)
    promises.push(addToPlaceGalleryPics({ id: place.id, galleryPicUrls }));
  if (deletedGalleryPicUrls && deletedGalleryPicUrls.length > 0)
    promises.push(removeFromPlaceGalleryPics({ id: place.id, galleryPicUrls: deletedGalleryPicUrls }));
  console.log("Keys to delete");
  console.log(keysToDelete);
  console.log(deletedGalleryPicUrls);
  if (keysToDelete && keysToDelete.length > 0)
    keysToDelete.forEach((k) => {
      console.log(k);
      promises.push(deleteImageFromS3(k));
    });
  await Promise.all(promises);
  return (0, import_server_runtime25.redirect)("/admin/places");
};
var ArrayInputWrap8 = import_styled_components54.default.div`
  display: flex;
`;
function AdminPlaceDetail() {
  var _a, _b, _c, _d, _e;
  const { place: defaultPlace, companies, tags, locations, categories, reservableTypes } = (0, import_react89.useLoaderData)();
  const [place, setPlace] = (0, import_react91.useState)(defaultPlace);
  const [deletedReservables, setDeletedReservables] = (0, import_react91.useState)([]);
  const [deletedGalleryImages, setDeletedGalleryImages] = (0, import_react91.useState)([]);
  const [addedImages, setAddedImages] = (0, import_react91.useState)(1);
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const deleteReservable2 = (e, id) => {
    if (id != "-1") {
      setDeletedReservables([...deletedReservables, id]);
    }
    setPlace(__spreadProps(__spreadValues({}, place), {
      reservables: [...place.reservables.filter((rx) => rx.id != id)]
    }));
  };
  const addReservable = (e) => {
    e.preventDefault();
    setPlace(__spreadProps(__spreadValues({}, place), {
      reservables: [
        ...place.reservables,
        {
          id: "-1",
          name: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          placeId: place.id,
          minimumReservationTime: 30,
          reservationsPerSlot: 1,
          reservableTypeId: null,
          reservableDaysAhead: 30
        }
      ]
    }));
  };
  const { lang } = useLangs();
  const findReservableTypeName = (id) => {
    let s = reservableTypes.find((rp) => rp.id == id);
    if (s == null ? void 0 : s.multiLangName) {
      return s.multiLangName[lang];
    }
    return "";
  };
  return /* @__PURE__ */ import_react90.default.createElement("div", null, /* @__PURE__ */ import_react90.default.createElement(import_react89.Form, {
    method: "post",
    encType: "multipart/form-data"
  }, /* @__PURE__ */ import_react90.default.createElement(IdInput, {
    name: "id",
    value: place == null ? void 0 : place.id
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "name",
    title: "Name",
    defaultValue: place == null ? void 0 : place.name
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "description",
    title: "Description",
    defaultValue: place == null ? void 0 : place.description
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "street",
    title: "Street",
    defaultValue: (place == null ? void 0 : place.street) ?? ""
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "city",
    title: "City",
    defaultValue: (place == null ? void 0 : place.city) ?? ""
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "postCode",
    title: "Postcode",
    defaultValue: (place == null ? void 0 : place.postCode) ?? ""
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    name: "howToGetThere",
    title: "How to get here?",
    defaultValue: (place == null ? void 0 : place.howToGetThere) ?? ""
  }), /* @__PURE__ */ import_react90.default.createElement("select", {
    name: "hidden",
    defaultValue: place.hidden ? "1" : "0"
  }, /* @__PURE__ */ import_react90.default.createElement("option", {
    value: "1"
  }, "Hidden"), /* @__PURE__ */ import_react90.default.createElement("option", {
    value: "0"
  }, "Not hidden")), /* @__PURE__ */ import_react90.default.createElement("select", {
    name: "companyId",
    defaultValue: (place == null ? void 0 : place.companyId) ?? ""
  }, companies.map((c) => /* @__PURE__ */ import_react90.default.createElement("option", {
    key: c.id,
    value: c.id
  }, c.name))), /* @__PURE__ */ import_react90.default.createElement(ArrayInput, {
    arrayTitle: "Reservables",
    deletedIdsName: "deletedReservable[]",
    deletedIds: deletedReservables,
    onAdd: (e) => {
      addReservable(e);
    },
    addButtonText: "Add new reservable"
  }, place.reservables.map((r) => /* @__PURE__ */ import_react90.default.createElement(ArrayInputWrap8, {
    key: r.id + r.createdAt
  }, /* @__PURE__ */ import_react90.default.createElement(IdInput, {
    name: "reservableId[]",
    value: r.id
  }), /* @__PURE__ */ import_react90.default.createElement(TextInput, {
    title: "Reservable name",
    name: "reservableName[]",
    defaultValue: r.name
  }), /* @__PURE__ */ import_react90.default.createElement(NumberInput, {
    title: "Minimum reservation interval (minutes)",
    name: "minimumReservationTime[]",
    defaultValue: r.minimumReservationTime
  }), /* @__PURE__ */ import_react90.default.createElement(NumberInput, {
    title: "Reservations per slot",
    name: "reservationsPerSlot[]",
    defaultValue: r.reservationsPerSlot
  }), /* @__PURE__ */ import_react90.default.createElement(NumberInput, {
    title: "Reservable days ahead",
    name: "reservableDaysAhead[]",
    defaultValue: r.reservableDaysAhead
  }), /* @__PURE__ */ import_react90.default.createElement(SingleSelectorInput, {
    defaultValueAndText: r.reservableTypeId ? { value: r.reservableTypeId, text: findReservableTypeName(r.reservableTypeId) } : null,
    title: "Reservable type",
    name: "reservableTypeId[]",
    possibleValuesAndTexts: reservableTypes.map((rt) => ({ value: rt.id, text: rt.multiLangName ? rt.multiLangName[lang] : "" }))
  }), /* @__PURE__ */ import_react90.default.createElement(Button2, {
    onClick: (e) => {
      deleteReservable2(e, r.id);
    }
  }, "Delete")))), /* @__PURE__ */ import_react90.default.createElement(ArrayInput, {
    arrayTitle: "Opening times"
  }, place.openingTimes.sort((a, b) => a.day - b.day).map((t) => /* @__PURE__ */ import_react90.default.createElement(ArrayInputWrap8, {
    key: t.id
  }, /* @__PURE__ */ import_react90.default.createElement("p", null, daysOfWeek[t.day]), /* @__PURE__ */ import_react90.default.createElement(IdInput, {
    name: "openingTime[]",
    value: `${t.id}`
  }), /* @__PURE__ */ import_react90.default.createElement(IdInput, {
    name: "day[]",
    value: `${t.day}`
  }), /* @__PURE__ */ import_react90.default.createElement(TimeInput, {
    title: "Open:",
    name: "open[]",
    defaultValue: new Date(t.open)
  }), /* @__PURE__ */ import_react90.default.createElement(TimeInput, {
    title: "Close:",
    name: "close[]",
    defaultValue: new Date(t.close)
  })))), /* @__PURE__ */ import_react90.default.createElement(MultiSelectorInput, {
    possibleValuesAndTexts: tags.map((t) => ({ value: t.id, text: t.multiLangName ? t.multiLangName[lang] : "" })),
    defaultValuesAndTexts: place.tags.map((t) => ({ value: t.id, text: t.multiLangName ? t.multiLangName[lang] : "" })),
    removedName: "removedTagIds[]",
    addedName: "addedTagIds[]"
  }), /* @__PURE__ */ import_react90.default.createElement(MultiSelectorInput, {
    possibleValuesAndTexts: categories.map((c) => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : "" })),
    defaultValuesAndTexts: place.categories.map((c) => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : "" })),
    removedName: "removedCategoryIds[]",
    addedName: "addedCategoryIds[]"
  }), /* @__PURE__ */ import_react90.default.createElement(SingleSelectorInput, {
    possibleValuesAndTexts: locations.map((l) => ({ value: l.id, text: `${l.multiLangCity ? l.multiLangCity[lang] : ""}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ""}` })),
    name: "locationId",
    defaultValueAndText: {
      value: ((_a = place.Location) == null ? void 0 : _a.id) ?? "",
      text: place.Location ? `${((_b = place.Location) == null ? void 0 : _b.multiLangCity) ? (_c = place.Location) == null ? void 0 : _c.multiLangCity[lang] : ""}, ${((_d = place.Location) == null ? void 0 : _d.multiLangCountry) ? (_e = place.Location) == null ? void 0 : _e.multiLangCountry[lang] : ""}` : ""
    }
  }), /* @__PURE__ */ import_react90.default.createElement("p", null, "Profile picture"), place.profilePicUrl && /* @__PURE__ */ import_react90.default.createElement("img", {
    loading: "lazy",
    style: { height: "120px", width: "120px" },
    src: place.profilePicUrl
  }), /* @__PURE__ */ import_react90.default.createElement("p", null, "Replace:"), /* @__PURE__ */ import_react90.default.createElement(ImageInput, {
    name: "profilePic"
  }), /* @__PURE__ */ import_react90.default.createElement("p", null, "Gallery pictures"), place.galleryPicUrls.map((g, i) => !deletedGalleryImages.includes(g) && /* @__PURE__ */ import_react90.default.createElement("div", {
    key: i
  }, /* @__PURE__ */ import_react90.default.createElement("img", {
    loading: "lazy",
    style: { height: "120px", width: "120px" },
    src: g ?? ""
  }), /* @__PURE__ */ import_react90.default.createElement(Button2, {
    onClick: () => {
      setDeletedGalleryImages([...deletedGalleryImages, g]);
    }
  }, "Delete"))), deletedGalleryImages.map((d, i) => /* @__PURE__ */ import_react90.default.createElement(IdInput, {
    key: i,
    name: "deletedGalleryPicUrls[]",
    value: d
  })), [...Array(addedImages).keys()].map((i) => /* @__PURE__ */ import_react90.default.createElement(ImageInput, {
    onChange: (value) => {
      if (value != "")
        setAddedImages(addedImages + 1);
    },
    key: i,
    name: "galleryPic[]"
  })), /* @__PURE__ */ import_react90.default.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/places/index.tsx
var places_exports3 = {};
__export(places_exports3, {
  default: () => PlacesAdminIndex,
  loader: () => loader35
});
var import_react92 = require("@remix-run/react");
var loader35 = async () => {
  const places = await getAllPlaces();
  return { places };
};
function PlacesAdminIndex() {
  const { places } = (0, import_react92.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, places.map((p) => {
    var _a;
    return /* @__PURE__ */ React.createElement("div", {
      key: p.id
    }, /* @__PURE__ */ React.createElement("p", null, "Name (Company): ", p.name, " (", (_a = p.company) == null ? void 0 : _a.name, ")"), /* @__PURE__ */ React.createElement(import_react92.Link, {
      to: `/admin/places/${p.id}`
    }, "View / Edit"));
  })), /* @__PURE__ */ React.createElement(import_react92.Link, {
    to: "/admin/places/new"
  }, "New Place"));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/places/new.tsx
var new_exports5 = {};
__export(new_exports5, {
  action: () => action22,
  default: () => AdminPlaceDetail2,
  loader: () => loader36
});
var import_react93 = require("@remix-run/react");
var import_server_runtime26 = require("@remix-run/server-runtime");
var import_styled_components55 = __toESM(require("styled-components"));
var loader36 = async ({ request, params }) => {
  return (0, import_server_runtime26.json)({ companies: await getCompanyList({ name: "" }) });
};
var action22 = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const place = {
    name: getFormItem("placeName"),
    companyId: getFormItem("companyId")
  };
  if (!place.name) {
    return badRequest({ field: { name: place.name, companyId: place.companyId } });
  }
  const createdPlace = await createPlace(place);
  const openingTimes = [...Array(7).keys()].map((i) => ({
    day: i,
    open: new Date(0, 0, 0, 8, 30),
    close: new Date(0, 0, 0, 16, 30),
    placeId: createdPlace.id
  }));
  await Promise.all(openingTimes.sort((a, b) => a.day - b.day).map((o) => createOpeningTime(o)));
  return (0, import_server_runtime26.redirect)("/admin/places");
};
var ArrayInputWrap9 = import_styled_components55.default.div`
  display: flex;
`;
function AdminPlaceDetail2() {
  var _a;
  const a = (0, import_react93.useActionData)();
  const { companies } = (0, import_react93.useLoaderData)();
  const company = { id: "-1", name: (_a = a == null ? void 0 : a.field) == null ? void 0 : _a.name };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "COMPANY ", company.name), /* @__PURE__ */ React.createElement(import_react93.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(TextInput, {
    name: "placeName",
    title: "Place name",
    defaultValue: company.name ?? ""
  }), /* @__PURE__ */ React.createElement("select", {
    name: "companyId"
  }, companies.map((c) => /* @__PURE__ */ React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.name))), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  default: () => TagAdmin2,
  loader: () => loader37
});
var import_react94 = require("@remix-run/react");
var loader37 = async ({ request, params }) => {
  return {};
};
function TagAdmin2() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "TAG ADMIN"), /* @__PURE__ */ React.createElement(import_react94.Outlet, null));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/tags/$tagId.tsx
var tagId_exports = {};
__export(tagId_exports, {
  action: () => action23,
  default: () => AdminTagDetail,
  loader: () => loader38
});
var import_react95 = require("@remix-run/react");
var import_server_runtime27 = require("@remix-run/server-runtime");
var import_styled_components56 = __toESM(require("styled-components"));
var loader38 = async ({ request, params }) => {
  if (!params.tagId)
    return (0, import_server_runtime27.json)({});
  const x = { tag: await getTag({ id: params.tagId }) };
  return (0, import_server_runtime27.json)({ tag: await getTag({ id: params.tagId }) });
};
var action23 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const tag = {
    id: getFormItem("id"),
    multiLangName: { id: "-1", czech: getFormItem("nameCzech"), english: getFormItem("nameEnglish") },
    multiLangDesc: { id: "-1", czech: getFormItem("descriptionCzech"), english: getFormItem("nameEnglish") }
  };
  await updateTag(tag);
  return (0, import_server_runtime27.redirect)("/admin/tags");
};
var ArrayInputWrap10 = import_styled_components56.default.div`
  display: flex;
`;
function AdminTagDetail() {
  var _a, _b, _c, _d, _e;
  const { tag } = (0, import_react95.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "TAG: ", (_a = tag.multiLangName) == null ? void 0 : _a.czech), /* @__PURE__ */ React.createElement(import_react95.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: tag == null ? void 0 : tag.id
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: (_b = tag == null ? void 0 : tag.multiLangName) == null ? void 0 : _b.czech
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "descriptionCzech",
    title: "Description (Czech)",
    defaultValue: (_c = tag == null ? void 0 : tag.multiLangDesc) == null ? void 0 : _c.czech
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: (_d = tag == null ? void 0 : tag.multiLangName) == null ? void 0 : _d.english
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "descriptionEnglish",
    title: "Description (English)",
    defaultValue: (_e = tag == null ? void 0 : tag.multiLangDesc) == null ? void 0 : _e.czech
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/tags/index.tsx
var tags_exports2 = {};
__export(tags_exports2, {
  default: () => CompaniesAdminIndex3,
  loader: () => loader39
});
var import_react96 = require("@remix-run/react");
var loader39 = async ({ request, params }) => {
  const tags = await getAllTags();
  return { tags };
};
function CompaniesAdminIndex3() {
  const { tags } = (0, import_react96.useLoaderData)();
  const { lang } = useLangs();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, tags.map((t) => /* @__PURE__ */ React.createElement("div", {
    key: t.id
  }, /* @__PURE__ */ React.createElement("p", null, "Name: ", t.multiLangName && t.multiLangName[lang]), /* @__PURE__ */ React.createElement("p", null, "Description: ", t.multiLangDesc && t.multiLangDesc[lang]), /* @__PURE__ */ React.createElement(import_react96.Link, {
    to: `/admin/tags/${t.id}`
  }, "View / Edit"))), /* @__PURE__ */ React.createElement(import_react96.Link, {
    to: "/admin/tags/new"
  }, "New tag")));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/admin/tags/new.tsx
var new_exports6 = {};
__export(new_exports6, {
  action: () => action24,
  default: () => AdminTagNew,
  loader: () => loader40
});
var import_react97 = require("@remix-run/react");
var import_server_runtime28 = require("@remix-run/server-runtime");
var import_styled_components57 = __toESM(require("styled-components"));
var loader40 = async ({ request, params }) => {
  return {};
};
var action24 = async ({ request }) => {
  const { getFormItem, getFormItems } = await getFormEssentials(request);
  const tag = {
    multiLangName: {
      id: "-1",
      czech: getFormItem("nameCzech"),
      english: getFormItem("nameEnglish")
    },
    multiLangDesc: {
      id: "-1",
      czech: getFormItem("descriptionCzech"),
      english: getFormItem("descriptionEnglish")
    }
  };
  if (!tag.multiLangName.english || !tag.multiLangName.czech || !tag.multiLangDesc.english || !tag.multiLangDesc.czech) {
    return badRequest({ field: { nameCzech: tag.multiLangName.czech, nameEnglish: tag.multiLangName.english, descriptionCzech: tag.multiLangDesc.czech, descriptionEnglish: tag.multiLangDesc.english } });
  }
  await createTag(tag);
  return (0, import_server_runtime28.redirect)("/admin/tags");
};
var ArrayInputWrap11 = import_styled_components57.default.div`
  display: flex;
`;
function AdminTagNew() {
  var _a, _b, _c, _d, _e;
  const a = (0, import_react97.useActionData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "TAG ", (_a = a == null ? void 0 : a.field) == null ? void 0 : _a.nameCzech), /* @__PURE__ */ React.createElement(import_react97.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement(IdInput, {
    name: "id",
    value: "-1"
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameCzech",
    title: "Name (Czech)",
    defaultValue: ((_b = a == null ? void 0 : a.field) == null ? void 0 : _b.nameCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "nameEnglish",
    title: "Name (English)",
    defaultValue: ((_c = a == null ? void 0 : a.field) == null ? void 0 : _c.nameEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "descriptionCzech",
    title: "Description (Czech)",
    defaultValue: ((_d = a == null ? void 0 : a.field) == null ? void 0 : _d.descriptionCzech) ?? ""
  }), /* @__PURE__ */ React.createElement(TextInput, {
    name: "descriptionEnglish",
    title: "Description (English)",
    defaultValue: ((_e = a == null ? void 0 : a.field) == null ? void 0 : _e.descriptionEnglish) ?? ""
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit"
  })));
}

// route:/Users/pavelpocho/Projects/reserveroo-remix-app/reserveroo/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => About2
});
var import_parallax = require("@react-spring/parallax");
var import_react98 = require("@remix-run/react");
var import_react99 = __toESM(require("react"));
var import_styled_components58 = __toESM(require("styled-components"));
var H1 = import_styled_components58.default.h1`
  margin-top: 4rem;
  color: ${styles.colors.primary};
  text-align: center;
`;
var Button3 = import_styled_components58.default.button`
  color: ${styles.colors.white};
  background-color: ${styles.colors.primary};
  border-radius: 0.4rem;
  padding: 0.7rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  border: none;
`;
var Wrapper = import_styled_components58.default.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${styles.shadows[1]};
  width: 300px;
  padding: 2rem;
  color: ${styles.colors.primary};
  background-color: ${styles.colors.gray};
`;
var ALink = (0, import_styled_components58.default)(import_react98.Link)`
  text-decoration: none;
`;
function About2() {
  const { setLandingPage } = useWhereAreWe();
  import_react99.default.useEffect(() => {
    setLandingPage(true);
    return () => {
      setLandingPage(false);
    };
  }, []);
  return /* @__PURE__ */ import_react99.default.createElement(import_react99.default.Fragment, null, /* @__PURE__ */ import_react99.default.createElement(import_parallax.Parallax, {
    pages: 6
  }, /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    factor: 1,
    speed: 0.3
  }, /* @__PURE__ */ import_react99.default.createElement(H1, null, "All the", /* @__PURE__ */ import_react99.default.createElement("span", {
    style: { color: styles.colors.busy }
  }, " activities "), "you love in", /* @__PURE__ */ import_react99.default.createElement("span", {
    style: { color: styles.colors.busy }
  }, " one place")), /* @__PURE__ */ import_react99.default.createElement(ALink, {
    to: "/places"
  }, /* @__PURE__ */ import_react99.default.createElement(Button3, null, "Check out activities")), /* @__PURE__ */ import_react99.default.createElement(H1, null, "Why was Reserveroo created?"), /* @__PURE__ */ import_react99.default.createElement("p", {
    style: { textAlign: "center" }
  }, "Scroll down")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 1,
    factor: 0.5,
    speed: 0.4,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "Imagine you are in a new city and you want to have some fun with your friend.", /* @__PURE__ */ import_react99.default.createElement("br", null), "What do you do?")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    sticky: { start: 1.3 }
  }), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 2,
    speed: 0.5,
    factor: 0.5,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "How do you find out what activities are available?", /* @__PURE__ */ import_react99.default.createElement("br", null), "A Google search perhaps?")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 3,
    factor: 0.5,
    speed: 0.6,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "Do you look at each website that pops up?")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 4,
    factor: 0.5,
    speed: 0.7,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "How do you know each place is legit and open?")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 5,
    factor: 0.5,
    speed: 0.8,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "Do you have to book a spot? No? Are you sure?")), /* @__PURE__ */ import_react99.default.createElement(import_parallax.ParallaxLayer, {
    offset: 6,
    factor: 0.5,
    speed: 2,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react99.default.createElement(Wrapper, null, "How do you book a spot?"))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "b301bc60", "entry": { "module": "/build/entry.client-X6M3IJQT.js", "imports": ["/build/_shared/chunk-FKVNPCUN.js", "/build/_shared/chunk-RPT4ZEQV.js", "/build/_shared/chunk-FN7GJDOI.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-USILH7NL.js", "imports": ["/build/_shared/chunk-WGKQYW5G.js", "/build/_shared/chunk-TVUIR4OO.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$placeId": { "id": "routes/$placeId", "parentId": "root", "path": ":placeId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$placeId-W345E5LY.js", "imports": ["/build/_shared/chunk-Y7WZK7Z5.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$placeId/index": { "id": "routes/$placeId/index", "parentId": "routes/$placeId", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/$placeId/index-ASOA725C.js", "imports": ["/build/_shared/chunk-WGKQYW5G.js", "/build/_shared/chunk-TVUIR4OO.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$placeId/reserve": { "id": "routes/$placeId/reserve", "parentId": "routes/$placeId", "path": "reserve", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$placeId/reserve-GRESJEI3.js", "imports": ["/build/_shared/chunk-WKASWSUF.js", "/build/_shared/chunk-QR3YEJQL.js", "/build/_shared/chunk-IS4EBVOC.js", "/build/_shared/chunk-JBPUE2AP.js", "/build/_shared/chunk-FTM4DERH.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-WGKQYW5G.js", "/build/_shared/chunk-TVUIR4OO.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/about-R7A7O53D.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin": { "id": "routes/admin", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin-2UXZDLOD.js", "imports": ["/build/_shared/chunk-EUWCKCHD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/categories": { "id": "routes/admin/categories", "parentId": "routes/admin", "path": "categories", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/categories-WIGKIAX4.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/categories/$categoryId": { "id": "routes/admin/categories/$categoryId", "parentId": "routes/admin/categories", "path": ":categoryId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/categories/$categoryId-U3RDRWUE.js", "imports": ["/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/categories/index": { "id": "routes/admin/categories/index", "parentId": "routes/admin/categories", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/categories/index-FNX2275K.js", "imports": ["/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-I3H5JW2H.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/categories/new": { "id": "routes/admin/categories/new", "parentId": "routes/admin/categories", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/categories/new-OSYGP724.js", "imports": ["/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/companies": { "id": "routes/admin/companies", "parentId": "routes/admin", "path": "companies", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/companies-5YWK75YQ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/companies/$companyId": { "id": "routes/admin/companies/$companyId", "parentId": "routes/admin/companies", "path": ":companyId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/companies/$companyId-BE5B5UMW.js", "imports": ["/build/_shared/chunk-6VTZ5AQ7.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/companies/index": { "id": "routes/admin/companies/index", "parentId": "routes/admin/companies", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/companies/index-7EN6UF3P.js", "imports": ["/build/_shared/chunk-6VTZ5AQ7.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/companies/new": { "id": "routes/admin/companies/new", "parentId": "routes/admin/companies", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/companies/new-QGZGAMWN.js", "imports": ["/build/_shared/chunk-6VTZ5AQ7.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/locations": { "id": "routes/admin/locations", "parentId": "routes/admin", "path": "locations", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/locations-TBNCWIA4.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/locations/$locationId": { "id": "routes/admin/locations/$locationId", "parentId": "routes/admin/locations", "path": ":locationId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/locations/$locationId-JTQHZVNV.js", "imports": ["/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/locations/index": { "id": "routes/admin/locations/index", "parentId": "routes/admin/locations", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/locations/index-2EMTKHKF.js", "imports": ["/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-I3H5JW2H.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/locations/new": { "id": "routes/admin/locations/new", "parentId": "routes/admin/locations", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/locations/new-RLQVA6C6.js", "imports": ["/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/places": { "id": "routes/admin/places", "parentId": "routes/admin", "path": "places", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/places-CT4S4YDE.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/places/$placeId": { "id": "routes/admin/places/$placeId", "parentId": "routes/admin/places", "path": ":placeId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/places/$placeId-OYITBLTD.js", "imports": ["/build/_shared/chunk-24YAGIHL.js", "/build/_shared/chunk-6VTZ5AQ7.js", "/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-VF5KXXSQ.js", "/build/_shared/chunk-Y7WZK7Z5.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/places/index": { "id": "routes/admin/places/index", "parentId": "routes/admin/places", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/places/index-2IQ43JDT.js", "imports": ["/build/_shared/chunk-Y7WZK7Z5.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/places/new": { "id": "routes/admin/places/new", "parentId": "routes/admin/places", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/places/new-NPHP2766.js", "imports": ["/build/_shared/chunk-24YAGIHL.js", "/build/_shared/chunk-6VTZ5AQ7.js", "/build/_shared/chunk-Y7WZK7Z5.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservableTypes/$reservableTypeId": { "id": "routes/admin/reservableTypes/$reservableTypeId", "parentId": "routes/admin", "path": "reservableTypes/:reservableTypeId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/reservableTypes/$reservableTypeId-LUJXZNEE.js", "imports": ["/build/_shared/chunk-VF5KXXSQ.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservableTypes/index": { "id": "routes/admin/reservableTypes/index", "parentId": "routes/admin", "path": "reservableTypes", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/reservableTypes/index-PHCM4WMV.js", "imports": ["/build/_shared/chunk-VF5KXXSQ.js", "/build/_shared/chunk-I3H5JW2H.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservableTypes/new": { "id": "routes/admin/reservableTypes/new", "parentId": "routes/admin", "path": "reservableTypes/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/reservableTypes/new-X6EKBPOY.js", "imports": ["/build/_shared/chunk-VF5KXXSQ.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservations": { "id": "routes/admin/reservations", "parentId": "routes/admin", "path": "reservations", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/reservations-OGBQ723Q.js", "imports": ["/build/_shared/chunk-26MBYJD5.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservations/$reservationId": { "id": "routes/admin/reservations/$reservationId", "parentId": "routes/admin/reservations", "path": ":reservationId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/reservations/$reservationId-IJKV2LEZ.js", "imports": ["/build/_shared/chunk-WKASWSUF.js", "/build/_shared/chunk-QR3YEJQL.js", "/build/_shared/chunk-IS4EBVOC.js", "/build/_shared/chunk-JBPUE2AP.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/reservations/index": { "id": "routes/admin/reservations/index", "parentId": "routes/admin/reservations", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/reservations/index-EM35ZCOY.js", "imports": ["/build/_shared/chunk-QR3YEJQL.js", "/build/_shared/chunk-JBPUE2AP.js", "/build/_shared/chunk-FTM4DERH.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/tags": { "id": "routes/admin/tags", "parentId": "routes/admin", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/tags-GE3IFYQV.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/tags/$tagId": { "id": "routes/admin/tags/$tagId", "parentId": "routes/admin/tags", "path": ":tagId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/tags/$tagId-OEQPMHRE.js", "imports": ["/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/tags/index": { "id": "routes/admin/tags/index", "parentId": "routes/admin/tags", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/tags/index-O5UUMBOQ.js", "imports": ["/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-I3H5JW2H.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/tags/new": { "id": "routes/admin/tags/new", "parentId": "routes/admin/tags", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/tags/new-DKCMONYR.js", "imports": ["/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/authenticate": { "id": "routes/authenticate", "parentId": "root", "path": "authenticate", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/authenticate-32WXVCUF.js", "imports": ["/build/_shared/chunk-YOWN2AVB.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/authenticate/login": { "id": "routes/authenticate/login", "parentId": "routes/authenticate", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/authenticate/login-KUGGUOQM.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/authenticate/register": { "id": "routes/authenticate/register", "parentId": "routes/authenticate", "path": "register", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/authenticate/register-I72IQBC4.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/doneVerifyingEmail": { "id": "routes/doneVerifyingEmail", "parentId": "root", "path": "doneVerifyingEmail", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/doneVerifyingEmail-OXS47DF3.js", "imports": ["/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-C74RVSAB.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-XMXFMUNS.js", "imports": ["/build/_shared/chunk-EUWCKCHD.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/places": { "id": "routes/places", "parentId": "root", "path": "places", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/places-URQ5C4RF.js", "imports": ["/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-Y7WZK7Z5.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/profile-CS36IFOT.js", "imports": ["/build/_shared/chunk-IS4EBVOC.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/profile/cancelReservation": { "id": "routes/profile/cancelReservation", "parentId": "routes/profile", "path": "cancelReservation", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/profile/cancelReservation-2LATRXGT.js", "imports": ["/build/_shared/chunk-JBPUE2AP.js", "/build/_shared/chunk-FTM4DERH.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/profile/edit": { "id": "routes/profile/edit", "parentId": "routes/profile", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/profile/edit-NC7PLSGM.js", "imports": ["/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-WGKQYW5G.js", "/build/_shared/chunk-TVUIR4OO.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/profile/index": { "id": "routes/profile/index", "parentId": "routes/profile", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/profile/index-MP7XLTGI.js", "imports": ["/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-WGKQYW5G.js", "/build/_shared/chunk-TVUIR4OO.js", "/build/_shared/chunk-I3H5JW2H.js", "/build/_shared/chunk-7YLPBSAL.js", "/build/_shared/chunk-26MBYJD5.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/pwd/forgot": { "id": "routes/pwd/forgot", "parentId": "root", "path": "pwd/forgot", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/pwd/forgot-YLT7HSZI.js", "imports": ["/build/_shared/chunk-CDKQJK6M.js", "/build/_shared/chunk-FTM4DERH.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-YOWN2AVB.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/pwd/reset": { "id": "routes/pwd/reset", "parentId": "root", "path": "pwd/reset", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/pwd/reset-XO5HEADO.js", "imports": ["/build/_shared/chunk-CDKQJK6M.js", "/build/_shared/chunk-FTM4DERH.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-YOWN2AVB.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/search-Y2IXETJ6.js", "imports": ["/build/_shared/chunk-N7PYVKJ4.js", "/build/_shared/chunk-65DR2DTC.js", "/build/_shared/chunk-BTTOKG7D.js", "/build/_shared/chunk-Y7WZK7Z5.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/verifyEmail": { "id": "routes/verifyEmail", "parentId": "root", "path": "verifyEmail", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/verifyEmail-ZYXCXKX7.js", "imports": ["/build/_shared/chunk-CDKQJK6M.js", "/build/_shared/chunk-FTM4DERH.js", "/build/_shared/chunk-UO7E4SR4.js", "/build/_shared/chunk-EUWCKCHD.js", "/build/_shared/chunk-YOWN2AVB.js", "/build/_shared/chunk-XDDV4RAY.js", "/build/_shared/chunk-QTSITXXQ.js", "/build/_shared/chunk-OWCQ3NZK.js", "/build/_shared/chunk-KHR7REP7.js", "/build/_shared/chunk-GGYM52YX.js", "/build/_shared/chunk-EKUNDD23.js", "/build/_shared/chunk-7ELF4O4C.js", "/build/_shared/chunk-WARXSPZD.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-B301BC60.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/doneVerifyingEmail": {
    id: "routes/doneVerifyingEmail",
    parentId: "root",
    path: "doneVerifyingEmail",
    index: void 0,
    caseSensitive: void 0,
    module: doneVerifyingEmail_exports
  },
  "routes/authenticate": {
    id: "routes/authenticate",
    parentId: "root",
    path: "authenticate",
    index: void 0,
    caseSensitive: void 0,
    module: authenticate_exports
  },
  "routes/authenticate/register": {
    id: "routes/authenticate/register",
    parentId: "routes/authenticate",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/authenticate/login": {
    id: "routes/authenticate/login",
    parentId: "routes/authenticate",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/verifyEmail": {
    id: "routes/verifyEmail",
    parentId: "root",
    path: "verifyEmail",
    index: void 0,
    caseSensitive: void 0,
    module: verifyEmail_exports
  },
  "routes/pwd/forgot": {
    id: "routes/pwd/forgot",
    parentId: "root",
    path: "pwd/forgot",
    index: void 0,
    caseSensitive: void 0,
    module: forgot_exports
  },
  "routes/pwd/reset": {
    id: "routes/pwd/reset",
    parentId: "root",
    path: "pwd/reset",
    index: void 0,
    caseSensitive: void 0,
    module: reset_exports
  },
  "routes/$placeId": {
    id: "routes/$placeId",
    parentId: "root",
    path: ":placeId",
    index: void 0,
    caseSensitive: void 0,
    module: placeId_exports
  },
  "routes/$placeId/reserve": {
    id: "routes/$placeId/reserve",
    parentId: "routes/$placeId",
    path: "reserve",
    index: void 0,
    caseSensitive: void 0,
    module: reserve_exports
  },
  "routes/$placeId/index": {
    id: "routes/$placeId/index",
    parentId: "routes/$placeId",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: placeId_exports2
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/profile/cancelReservation": {
    id: "routes/profile/cancelReservation",
    parentId: "routes/profile",
    path: "cancelReservation",
    index: void 0,
    caseSensitive: void 0,
    module: cancelReservation_exports
  },
  "routes/profile/index": {
    id: "routes/profile/index",
    parentId: "routes/profile",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: profile_exports2
  },
  "routes/profile/edit": {
    id: "routes/profile/edit",
    parentId: "routes/profile",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/places": {
    id: "routes/places",
    parentId: "root",
    path: "places",
    index: void 0,
    caseSensitive: void 0,
    module: places_exports
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: search_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/admin/reservableTypes/$reservableTypeId": {
    id: "routes/admin/reservableTypes/$reservableTypeId",
    parentId: "routes/admin",
    path: "reservableTypes/:reservableTypeId",
    index: void 0,
    caseSensitive: void 0,
    module: reservableTypeId_exports
  },
  "routes/admin/reservableTypes/index": {
    id: "routes/admin/reservableTypes/index",
    parentId: "routes/admin",
    path: "reservableTypes",
    index: true,
    caseSensitive: void 0,
    module: reservableTypes_exports
  },
  "routes/admin/reservableTypes/new": {
    id: "routes/admin/reservableTypes/new",
    parentId: "routes/admin",
    path: "reservableTypes/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/admin/reservations": {
    id: "routes/admin/reservations",
    parentId: "routes/admin",
    path: "reservations",
    index: void 0,
    caseSensitive: void 0,
    module: reservations_exports
  },
  "routes/admin/reservations/$reservationId": {
    id: "routes/admin/reservations/$reservationId",
    parentId: "routes/admin/reservations",
    path: ":reservationId",
    index: void 0,
    caseSensitive: void 0,
    module: reservationId_exports
  },
  "routes/admin/reservations/index": {
    id: "routes/admin/reservations/index",
    parentId: "routes/admin/reservations",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: reservations_exports2
  },
  "routes/admin/categories": {
    id: "routes/admin/categories",
    parentId: "routes/admin",
    path: "categories",
    index: void 0,
    caseSensitive: void 0,
    module: categories_exports
  },
  "routes/admin/categories/$categoryId": {
    id: "routes/admin/categories/$categoryId",
    parentId: "routes/admin/categories",
    path: ":categoryId",
    index: void 0,
    caseSensitive: void 0,
    module: categoryId_exports
  },
  "routes/admin/categories/index": {
    id: "routes/admin/categories/index",
    parentId: "routes/admin/categories",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: categories_exports2
  },
  "routes/admin/categories/new": {
    id: "routes/admin/categories/new",
    parentId: "routes/admin/categories",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports2
  },
  "routes/admin/companies": {
    id: "routes/admin/companies",
    parentId: "routes/admin",
    path: "companies",
    index: void 0,
    caseSensitive: void 0,
    module: companies_exports
  },
  "routes/admin/companies/$companyId": {
    id: "routes/admin/companies/$companyId",
    parentId: "routes/admin/companies",
    path: ":companyId",
    index: void 0,
    caseSensitive: void 0,
    module: companyId_exports
  },
  "routes/admin/companies/index": {
    id: "routes/admin/companies/index",
    parentId: "routes/admin/companies",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: companies_exports2
  },
  "routes/admin/companies/new": {
    id: "routes/admin/companies/new",
    parentId: "routes/admin/companies",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports3
  },
  "routes/admin/locations": {
    id: "routes/admin/locations",
    parentId: "routes/admin",
    path: "locations",
    index: void 0,
    caseSensitive: void 0,
    module: locations_exports
  },
  "routes/admin/locations/$locationId": {
    id: "routes/admin/locations/$locationId",
    parentId: "routes/admin/locations",
    path: ":locationId",
    index: void 0,
    caseSensitive: void 0,
    module: locationId_exports
  },
  "routes/admin/locations/index": {
    id: "routes/admin/locations/index",
    parentId: "routes/admin/locations",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: locations_exports2
  },
  "routes/admin/locations/new": {
    id: "routes/admin/locations/new",
    parentId: "routes/admin/locations",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports4
  },
  "routes/admin/places": {
    id: "routes/admin/places",
    parentId: "routes/admin",
    path: "places",
    index: void 0,
    caseSensitive: void 0,
    module: places_exports2
  },
  "routes/admin/places/$placeId": {
    id: "routes/admin/places/$placeId",
    parentId: "routes/admin/places",
    path: ":placeId",
    index: void 0,
    caseSensitive: void 0,
    module: placeId_exports3
  },
  "routes/admin/places/index": {
    id: "routes/admin/places/index",
    parentId: "routes/admin/places",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: places_exports3
  },
  "routes/admin/places/new": {
    id: "routes/admin/places/new",
    parentId: "routes/admin/places",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports5
  },
  "routes/admin/tags": {
    id: "routes/admin/tags",
    parentId: "routes/admin",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports
  },
  "routes/admin/tags/$tagId": {
    id: "routes/admin/tags/$tagId",
    parentId: "routes/admin/tags",
    path: ":tagId",
    index: void 0,
    caseSensitive: void 0,
    module: tagId_exports
  },
  "routes/admin/tags/index": {
    id: "routes/admin/tags/index",
    parentId: "routes/admin/tags",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: tags_exports2
  },
  "routes/admin/tags/new": {
    id: "routes/admin/tags/new",
    parentId: "routes/admin/tags",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports6
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
