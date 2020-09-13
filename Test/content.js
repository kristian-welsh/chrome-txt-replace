var replacements = [
{oldValue:'Yasmine', newValue:'Alex'}
];

// You don't need to touch any code past this point

replacements.forEach(function(replacement) {
  replacement["count"] = 0;
});

var numReplacements = 0;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

// Replace all occurances a replacement with it's substitute
function makeReplacements(node, replacement) {
    node.innerHTML = node.innerHTML.replace(new RegExp(replacement.oldValue, "g"), replacement.newValue);
    replacement["count"]++;
    console.log("Replaced occurances of " + replacement.oldValue + " with " + replacement.newValue + ", run number " + replacement.count);
}

// Replace all things that need replacing for a node.
function makeReplacementsIfNeeded(node) {
  replacements.forEach(function(replacement) {
    if(node.textContent.indexOf(replacement.oldValue) > -1) {
      makeReplacements(node, replacement);
    }
  });
}

// function is called whenever the DOM is changed
var observer = new MutationObserver(function(mutations) {
  // for each mutation
  mutations.forEach(function(mutation) {
    var addedNode;
    // for each node added in this mutation
    for(var i = 0; i < mutation.addedNodes.length; i++) {
      makeReplacementsIfNeeded(mutation.addedNodes[i]);
    }
  });
});

// replace all new occurances
observer.observe(document, {
  subtree: true,
  childList:true
});

// replaceYasmine breaks chat windows if called as page is loading, so wait for it to finish first, then replace all pre-existing instances.
setTimeout(function() {
    makeReplacementsIfNeeded(document.body);
}, 3000);
