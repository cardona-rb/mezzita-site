# Evidence that online reviews and star ratings change restaurant revenue and traffic

Verification note: several primary pages returned 403/404 (Womply, UBC Sauder, BrightLocal 2025, Wiley/INFORMS full texts). Where I only saw abstracts or secondary summaries I say so. All study numbers below come from the sources linked; nothing is estimated by me.

## 1. Academic causal studies: rating, review count, owner responses

### Takeaway
The best causal evidence is Yelp-only and US-only: Luca (Seattle) finds +1 star = +5-9% revenue for independents (none for chains); Anderson & Magruder (San Francisco) find +0.5 star = +19 percentage points (49% relative) in sell-out frequency. I found NO peer-reviewed causal study isolating Google ratings on restaurant sales. Management-response evidence is from hotels (TripAdvisor), not restaurants.

### Cited Findings
- Luca, "Reviews, Reputation, and Revenue: The Case of Yelp.com", HBS Working Paper 12-016 (SSRN abstract dated 2016 in one listing; first circulated 2011). Combines Yelp data with Washington State Department of Revenue restaurant revenue; regression discontinuity on Yelp's half-star rounding; one-star increase = about 5-9% revenue; effect concentrated in independents, chains show no rating effect, and chains lost market share as Yelp penetration rose. Consumers respond more when ratings carry more information (more reviews, elite reviewers). — [SSRN abstract](https://papers.ssrn.com/abstract=1928601); [Harvard Magazine](https://harvardmagazine.com/node/33472)
- Luca sample: Seattle restaurants; about 60,000 Yelp reviews by 2009, covering roughly 70% of the city's restaurants (restaurant count and exact window not stated in the source I read; another summary says 2003-2009). The 5-9% range depends on controls and estimation method. — [HBS Working Knowledge](https://www.library.hbs.edu/working-knowledge/the-yelp-factor-are-consumer-reviews-good-for-business); window per [secondary summary via search, 2003-2009]
- Luca critique: Mother Jones noted the regression implies revenue falls away from the discontinuity, which they called peculiar. — [Mother Jones](https://www.motherjones.com/?p=138567) (journalistic, not a formal refutation)
- Anderson & Magruder (2012), "Learning from the Crowd: Regression Discontinuity Estimates of the Effects of an Online Review Database", Economic Journal 122(563):957-989. Sample: about 300 San Francisco-area restaurants on Yelp, using the half-star rounding discontinuity; an extra half star causes restaurants to sell out 19 percentage points (49%) more often, with larger effects when other information is scarce. Authors' robustness checks find no discontinuous manipulation of ratings. Note: 19 is percentage points, not 19%; Wikipedia misstates it. Outcome is reservation-platform sell-out (evening slots), not revenue. — [Paper PDF](https://are.berkeley.edu/~jmagruder/Anderson%20and%20Magruder.pdf) (finding details from search summary of the paper's abstract)
- Proserpio & Zervas (2017), "Online Reputation Management: Estimating the Impact of Management Responses on Consumer Reviews", Marketing Science 36(5):645-665. HOTELS, not restaurants. Difference-in-differences TripAdvisor (hotels respond) vs Expedia (almost never). Responding hotels gained about 0.12 stars and about 12% more review volume; negative reviews became fewer but longer after responding. — [BU Open](https://open.bu.edu/items/9b759580-53d3-44ff-975e-c17d5641abcc); [DAC Group summary](https://www.dacgroup.com/?p=103813)
- Restaurant-specific response evidence: Evans et al. (2012) experiment using mock-up Yelp profiles found readers were least likely to visit when a negative review got no response; constructive responses offset but did not fully reverse the damage. Also an ISR paper ("Exit, Voice, and Response on Digital Platforms"; authors not confirmed by me) using Yelp restaurant data reports owner responses positively affect later ratings. — [search summary of Evans et al.; ISR supplement](https://pubsonline.informs.org/doi/suppl/10.1287/isre.2017.0749/suppl_file/isre.2017.0749-sm.pdf)
- Review volume: UBC Sauder news item describes a study by Limin Fang on Texas restaurants: doubling review activity raised revenue of high-quality independent restaurants by 5-19% (stronger near highway exits) and lowered it for low-quality ones; data included foot traffic. I could not open the page (403) nor confirm the journal or year. — [UBC Sauder](https://www.sauder.ubc.ca/news/insights/online-reviews-can-make-or-break-independent-restaurants-near-highways-study) (snippet only, treat as unverified)
- Platform comparison: a cross-platform paper reports Google Maps restaurant ratings average 0.7 stars higher than Yelp, driven largely by chains. — [ResearchGate](https://www.researchgate.net/publication/348259677_3_Stars_on_Yelp_4_Stars_on_Google_Maps_A_Cross-Platform_Examination_of_Restaurant_Ratings)

### Inferences
- Honest copy: "Research on Yelp in two US cities found that a higher displayed rating raised independent-restaurant revenue and the chance of selling out." Do not say "Google" or "Bolivia" for the causal claim. Both effects come from threshold jumps in displayed rating, so they measure the effect of crossing a half-star line, not of review count alone.
- The Luca finding that effects concentrate in independents is favourable to Mezzita's likely customers (non-chain restaurants).
- Do not write "+19%"; write "19 percentage points".

### Gaps
- No peer-reviewed causal Google-rating-on-restaurant-sales study found.
- No recency-effect causal study found (only survey evidence, see section 3).
- Luca restaurant count, Fang paper details, Evans et al. full citation, and ISR authors not verified from primary text.
- Nothing from Latin America / Bolivia.

## 2. Industry datasets (Womply, Spiegel, others)

### Takeaway
Womply (2018/2019, US, 200,000+ small businesses, all verticals, not restaurants-only) and Spiegel (2017, e-commerce products, not restaurants) are correlational and not restaurant-specific. I did not find primary reports from Broadly, ReviewTrackers, Birdeye or Podium with restaurant revenue effects.

### Cited Findings
- Womply analysis of transaction and review data from over 200,000 US businesses (all industries incl. restaurants): businesses rated 4-4.5 stars earned about 28% more annual revenue (baseline unclear); 3.5-4.5 best band; five-star businesses earned less than average; businesses with more than the average 82.5 reviews earned about 54% more; replying to at least 25% of reviews associated with 35% more revenue. Dating inconsistent (2018 vs 2019). Correlational. — [MediaPost](https://www.mediapost.com/publications/article/341093/the-impact-of-star-ratings-and-reviews-on-revenue.html); [Search Engine Land](https://searchengineland.com/review-counts-matter-more-to-local-business-revenue-than-star-ratings-according-to-study-320271) (page 403 on fetch; figures from search summary); original Womply report not located.
- Spiegel Research Center (Northwestern), "How Online Reviews Influence Sales", 2017: product with five reviews has 270% higher purchase likelihood than none; 190% lift for lower-priced, 380% for higher-priced (chart says approx. 200% / nearly 400%); diminishing returns after the first five; purchase likelihood peaks at 4.0-4.7 stars and declines toward 5.0; verified-buyer label +15%. Data reported elsewhere as 100,000+ SKUs, 15 million page views at two CPG retailers and one gift retailer; the Spiegel page itself gives no dataset, sample, or limitations. E-commerce conversion on retailer sites, NOT restaurants. — [Spiegel](https://spiegel.medill.northwestern.edu/How-Online-Reviews-Influence-Sales); [Digital Commerce 360 summary of dataset](https://www.digitalcommerce360.com/?p=759700)
- Industry claim "restaurants with 4.5+ stars outperform 3.5-star on foot traffic" appears in marketing blogs without a study cited. — [Sunday App blog](https://sundayapp.com/the-impact-of-online-reputation-on-your-restaurants-foot-traffic/) (flag: no traceable primary)
- One vendor-source claim that restaurants with stronger guest sentiment outpaced market by 2.4% in sales and 1.8% in traffic, with Google the most important platform: could not verify the source. — search result only; do not cite.

### Inferences
- Spiegel's 4.0-4.7 sweet spot and "first five reviews" curve are useful to argue a perfect 5.0 is not the goal and that going from 0 to a handful of reviews matters most, but must be labelled e-commerce.
- Womply's "review count beats stars" is the supportive point for a volume-focused product like Mezzita, but it is correlational (established businesses have both more reviews and more revenue).

### Gaps
- Primary Womply report; any Birdeye/Podium/Broadly/ReviewTrackers restaurant revenue study with traceable methodology: not found.

## 3. Consumer surveys (BrightLocal)

### Takeaway
BrightLocal 2026 (published 11 Feb 2026, 1,002 US adults, SurveyMonkey panel) shows near-universal review reading and rising star and recency thresholds. It reports no restaurant-specific breakdown in what I could read. US-only; stated-behaviour survey.

### Cited Findings
- 97% read reviews for local businesses; 41% always (29% in 2025). 68% require 4+ stars (55% in 2025); 31% require 4.5+ (17% in 2025); 10% require 5. — [BrightLocal LCRS 2026](https://www.brightlocal.com/research/local-consumer-review-survey/) (per fetch summary)
- Recency: 74% look for reviews from the last 3 months; 32% last 2 weeks (20% in 2025); 18% last week only. — same
- Volume: 47% won't use a business with fewer than 20 reviews; 9% would use one with 5 or fewer. — same
- Responses: 89% expect owner replies; 80% likely to use a business that responds to all reviews; 42% unlikely to use one that never replies; 50% put off by templated replies; 81% expect a reply within a week. — same
- Google: 71% use Google for reviews (83% in 2025). 45% wrote a Google review in the past year. 78% were asked for a review in the past 12 months; 65% of those wrote one (the page also gives 83%, internally inconsistent; verify before citing). — same
- Earlier editions: 2018 survey found 57% would only use a business with 4+ stars (all local, not restaurants). — [BrightLocal 2018](https://www.brightlocal.com/research/local-consumer-review-survey-2018/)
- Toast survey: 46% say Google Reviews is the first place they check restaurant ratings (vendor survey, sample not checked). — [Toast](https://pos.toasttab.com/blog/on-the-line/restaurant-reviews-and-ratings-data)

### Inferences
- "47% won't use a business with fewer than 20 reviews" and "74% want reviews from the last 3 months" support continuous collection rather than one-off pushes. Cite as US survey of local businesses generally.
- Rising thresholds year over year (55% to 68% for 4+) mean a 3.8 rating is increasingly filtered out.

### Gaps
- Restaurant-only cuts, the 2024/2025 reports (page 404/403), and "how many reviews people read" were not obtained.

## 4. Effect of asking customers for reviews

### Takeaway
Evidence that asking raises review volume exists for hotels (TripAdvisor, 34.3%) but with side effects; nothing rigorous found on QR/NFC counter plaques for restaurants. BrightLocal shows asking is already common.

### Cited Findings
- TripAdvisor Review Express natural experiment (Management Science 2023, "The Pitfalls of Review Solicitation", DOI 10.1287/mnsc.2023.01006): hotels using solicitation got 34.3% more reviews per month, rating +0.151, solicited reviews 16.9% shorter, organic reviews fell 15.5%; effect biggest for smaller, cheaper, lower-rated hotels. Matched hotels TripAdvisor vs Expedia. Hotels, not restaurants; I did not verify the author list. — [INFORMS](https://pubsonline.informs.org/doi/references/10.1287/mnsc.2023.01006); [HKUST summary](https://bm.hkust.edu.hk/feature-stories/2026/03/hidden-cost-asking-reviews)
- Airbnb randomized test (Fradkin & Holtz): $25 coupon for reviews on unreviewed listings produced more, but more negative, reviews and no change in nights sold or revenue. Incentivized, so not allowed under Google's rules. — [Haas summary](https://newsroom.haas.berkeley.edu/research/study-using-airbnb-data-sheds-light-on-whether-incentivizing-customer-reviews-makes-a-difference/)
- Timing: Journal of Marketing field experiments (Jung and co-authors) suggest reminders right after purchase can cause reactance while delayed reminders may work better. — [UNLV](https://unlv.edu/news/accomplishments/miyeon-jung) (abstract-level)
- Vendor: GatherUp analysis of about 10,000 locations says volume rose after stopping gating with little change in star average. Vendor, not peer-reviewed. — [GatherUp](https://gatherup.com/?p=12020)

### Inferences
- Mezzita's asking-after-ordering timing is inside the window the Journal of Marketing work flags as risky (immediately after purchase); suggest hedging copy and not claiming a number.
- Do not cite 34.3% as a restaurant expectation.

### Gaps
- No peer-reviewed or traceable data on QR/NFC plaque review lift for restaurants; no data for Bolivia.

## 5. Google policy: gating and incentives (compliance)

### Takeaway
Asking every customer, with a QR code or link, is explicitly allowed. Paying or rewarding, selective solicitation (gating), quotas and pressure on premises are not. Mezzita copy and script must not promise rewards, filter happy customers, or require reviews at the counter.

### Cited Findings
- Maps user-generated content policy (fake engagement): paid reviews "directly or in kind" prohibited; merchants may not offer payment, discounts or free goods/services for a review, revision, or removal of a negative one; may not discourage or prohibit negative reviews or selectively solicit positive ones; "should not require or pressure users to leave ratings or write reviews while on the premises"; no staff quotas; no asking staff to solicit specific content; merchants may solicit genuine-experience reviews without incentives or influencing rating/content. Quotes from fetch summary of the page. — [Google Maps contribution policy](https://support.google.com/contributionpolicy/answer/7400114)
- Business Profile help: "you can ask customers to visit a Google link or scan a QR code"; incentives for posting, changing or removing reviews "strictly prohibited"; reviews must reflect a genuine experience. That page does not itself mention gating. — [Google Business Profile Help](https://support.google.com/business/answer/3474122)
- Enforcement: removal, listing penalties, possible suspension; sudden spikes can trigger removals (third-party blog, not Google). — [SearchLab Digital](https://searchlabdigital.com/blog/google-review-guidelines-2026-update/)
- US FTC rules on deceptive endorsements apply to US sellers (secondary claim; Bolivian applicability not researched).

### Inferences
- Key risks for the plaque product: (1) "on premises" pressure language, (2) staff quotas or bonuses, (3) any "rate us, get a discount" copy, (4) any flow that routes unhappy customers away from Google. A neutral "ask everyone" plaque is compliant.
- Verify the policy wording again before launch since pages change.

### Gaps
- I did not see the policy text directly in raw form (fetch tool summarised it), so exact quotes should be rechecked on the live page.
