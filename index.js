const { app, BrowserWindow, session } = require('electron')
app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:9050')
var mainWindow = null

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit()
	}
})

app.on('ready', function () {

	session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
	
		details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Iridium/1.0.0' 

		var test_url = details.url;
		var check_block_list =/mathtag.com|pulsemgr.com|advertising.com|bluecava.com|estara\.com|\/site_ads|\.omtrdc\.net|thebrighttag\.com|coremetrics\.com|\.(gr|hk|fm|eu|it|es|is|net|ke|me||tz|za|zm|uk|us|in|com|de|fr|zw|tv|sk|se|php|pk|pl)\/ads?[\-_./\?]|(stats?|rankings?|tracks?|trigg|webtrends?|webtrekk|statistiche|visibl|searchenginejournal|visit|webstat|survey|spring).*.(com|net|de|fr|co|it|se|jp|es)|cloudflare|\/statistics\/|torrent|[\-_./]ga[\-_./]|[\-_./]counter[\-_./\?]|ad\.admitad\.|\/widgets?[\-_./]?ads?|\/videos?[\-_./]?ads?|\/valueclick|userad|track[\-_./]?ads?|\/top[\-_./]?ads?|\/sponsor[\-_./]?ads?|smartadserver|\/sidebar[\-_]?ads?|popunder|\/includes\/ads?|\/iframe[-_]?ads?|\/header[-_]?ads?|\/framead|\/get[-_]?ads?|\/files\/ad*|exoclick|displayad|\ajax\/ad|adzone|\/assets\/ad*|advertisement|\/adv\/*\.|ad-frame|\.com\/bads\/|follow-us|connect-|-social-|googleplus.|linkedin|footer-social.|social-media|gmail|commission|adserv\.|omniture|netflix|huffingtonpost|dlpageping|log204|geoip\.|baidu|reporting\.|paypal|maxmind|geo\.|api\.bit|hits|predict|cdn-cgi|record_|\.ve$|radar|\.pop|\.tinybar\.|\.ranking|.cash|\.banner\.|adzerk|gweb|alliance|adf\.ly|monitor|urchin_post|imrworldwide|gen204|twitter|naukri|hulu.com|baidu|seotools|roi-|revenue|tracking.js|\/tracking[\-_./]?|elitics|demandmedia|bizrate|click-|bidsystem|affiliates?\.|beacon|hit\.|googleadservices|metrix|googleanal|abmr.net|dailymotion|ga.js|survey|trekk|tellapart.com|arcadebanners?|ielsen|cts\.|link_|ga-track|FacebookTracking|quantc|traffic|evenuescien|csi\.gstatic|gen_204|roitra|pixelt|pagetra|metrics|[-_/.]?stats?[.-_/]?|common_|accounts\.|contentad|iqadtile|boxad|audsci.js|ebtrekk|seotrack|clickalyzer|youtube|\/tracker\/|ekomi|clicky|[-_/.]?tracking?[.-_/]?|[-_/.]?track?[.-_/]?|ghostery|hscrm|watchvideo|clicks4ads|mkt[0-9]|createsend|analytix|shoppingshadow|clicktracks|admeld|google-analytics|-analytic|googletagservices|googletagmanager|tracking\.|thirdparty|track\.|pflexads|smaato|medialytics|doubleclick.net|doubleclick.com|\-static|\-static\-|static\-|sponsored\-banner|static\_|\_static\_|tagtray.com|tracking2.channeladvisor.com|js-agent.newrelic.com|agkn.com|twitter.com\/oct\.js|\_static|duckduckgo\.com\/t\/|sponsored_link|sponsored_ad|googleadword|analytics\.|googletakes|adsbygoogle|analytics\-|\-analytic|analytic\-|googlesyndication|\.net\/p\.gif\?|adsense|googleAdIndexTop|\/ads\/|google-ad-|google-ad?|google-adsense-|google-adsense.|google-adverts-|google-adwords|google-afc-|google-afc.|google\/ad\?|google\/adv\.|google160.|google728.|_adv|google_afc.|google_afc_|google_afs.|google_afs_widget|google_caf.js|google_lander2.js|google_radlinks_|googlead|googleafc.|googleafs.|googleafvadrenderer.|googlecontextualads.|googleheadad.|googleleader.|googleleads.|googlempu.|ads\_|\_ads\_|\_ads|dynaTraceMonitor|advertise.js|\_promo\_id\=|bazaarvoice.com|\/b\/ss\/\*\&aqe\=|analytics-static.ugc.bazaarvoice.com|iesnare.com|easyads|easyads|easyadstrack|ebayads|[.\-_/\?](ads?|clicks?|tracks?|tracking|logs?)[.\-_/]?(banners?|mid|trends|pathmedia|tech|units?|vert*|fox|area|loc|nxs|format|call|script|final|systems?|show|tag\.?|collect*|slot|right|space|taily|vids?|supply|true|targeting|counts?|nectar|net|onion|parlor|2srv|searcher|fundi|nimation|context|stats?|vertising|class|infuse|includes?|spacers?|code|images?|vers|texts?|work*|tail|track|streams?|ability||world*|zone|position|vertisers?|servers?|view|partner|data)[.\-_/]?/gi
		var check_white_list =/seller|min.js|logos?|jquery|catalog|status|premoa.*.jpg|rakuten|nitori-net|search\?tbs\=sbi\:|google.*\/search|\/shopping\/product|aclk?|translate.googleapis.com|encrypted-|product|www.googleadservices.com\/pagead\/aclk|statue|target.com|.css|lib.js|tealeaf.js/gi;
		var block_me = check_block_list.test(test_url);
		var release_me = check_white_list.test(test_url);

		if(release_me){

			callback({cancel: false, requestHeaders: details.requestHeaders})

		}else if(block_me) {

			callback({cancel: true, requestHeaders: details.requestHeaders})

		}else{

			callback({cancel: false, requestHeaders: details.requestHeaders})
		}
	})
	
	mainWindow = new BrowserWindow({
		width: 1030, 
		height: 720, 
		frame: false, 
		webPreferences: { 
			nodeIntegration: true,
			webSecurity: true,
			webviewTag: true
		}
	})
	mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'))
	mainWindow.webContents.openDevTools()
	mainWindow.on('closed', function () {
		mainWindow = null
	})
})

