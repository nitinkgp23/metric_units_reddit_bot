const environment = require('./helper').environment();

const stopMessage = "Please click 'block user' below and you will not see any more conversions from this bot.\n\nSo long, and thanks for all the fish";

function formatReply(comment, conversions) {
  let species = "bot"
  let source = "source"
  let version = environment['version'];
  let subreddit = comment['subreddit'];
  let transform = (x) => x;

  if (comment['subreddit'].match(/^totallynotrobots$/i)) {
    species = "HUMAN";
    source =  "~~SOURCE~~";
    version = "~~" + String(environment['version']).toUpperCase() + "~~";
    subreddit = "I_AM_HUMAN_DO_NOT_BAN"
    transform = (x) => x.toUpperCase();
  }

  return Object.keys(conversions)
    .map(nonMetricValue => nonMetricValue + " ≈ " + conversions[nonMetricValue])
    .map(transform)
    .join("  \n")
    + "\n\n"
    + transform("^metric ^units ^" + species)
    + " ^|"
    + " ^[" + transform("feedback") + "](https://www.reddit.com/r/metric_units/comments/73edn2/constructive_feedback_thread/)"
    + " ^|"
    + " ^[" + source + "](https://github.com/cannawen/metric_units_reddit_bot)"
    + " ^|"
    + " ^[" + transform("hacktoberfest") + "](https://www.reddit.com/r/metric_units/comments/73ef7e/contribute_to_metric_units/)"
    + " ^|"
    + " ^[" + transform("block") + "](https://www.reddit.com/message/compose?to=metric_units&subject=stop&message=If%20you%20would%20like%20to%20stop%20seeing%20this%20bot%27s%20comments%2C%20please%20send%20this%20private%20message%20with%20the%20subject%20%27stop%27.%20If%20you%20are%20a%20moderator%2C%20please%20go%20to%20https%3A%2F%2Fwww.reddit.com%2Fr%2F" + subreddit + "%2Fabout%2Fbanned%2F)"
    + " ^|"
    + " ^" + version;
}

module.exports = {
  stopMessage,
  "formatReply" : formatReply
}
