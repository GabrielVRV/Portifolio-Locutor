/** sessionStorage key marking that the intro already played in this tab. */
export const INTRO_SEEN_KEY = "tuning-intro-seen";

/**
 * Runs before first paint, so a returning visitor never sees the intro flash
 * and the page never scrolls behind it:
 * - seen this session → `data-intro-seen` (CSS hides the intro);
 * - first visit with motion allowed → `data-intro="playing"` (locks scroll and
 *   holds entrance animations until the intro ends).
 * Users who prefer reduced motion get neither, and CSS hides the intro.
 */
export const INTRO_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("${INTRO_SEEN_KEY}")){d.setAttribute("data-intro-seen","")}else if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","playing")}}catch(e){}})();`;
