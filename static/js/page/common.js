import kotlinPlayground from 'kotlin-playground';
import $ from 'jquery';
import 'whatwg-fetch';
import { h, hydrate } from 'preact'
import '../com/search/search';
import '../com/cities-banners';
import GifPlayer from '../com/gif-player/gif-player';
import CodeMirror from '../com/codemirror/CodeMirror';
import './code-blocks'
import '../com/head-banner';
import '../../../@ktl-components/dist/header.css'

function trackEvent(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'GAEvent',
    ...event,
  });
}

window.trackEvent = trackEvent;

function initSamples () {
  $('.sample').each(function(i, el) {
    const kotlinPlaygroundEvents = {
      onChange: function onChange(code) { $(el).trigger('kotlinPlaygroundChange', code) },
      onRun: function onRun() { $(el).trigger('kotlinPlaygroundRun') },
      callback: function(from, to) { $(el).trigger('kotlinPlaygroundMount', { from, to }) }
    };

    kotlinPlayground(el, kotlinPlaygroundEvents);
  });
}

function initOverviewCodeExample() {
  $('.kotlin-overview-code-example')
      .on('kotlinPlaygroundMount', function({ target }) {
        $(target).data('kotlinOriginalCode', target.KotlinPlayground.view.getCode());
      })
      .on('kotlinPlaygroundRun', function({ target }) {
        const code = target.KotlinPlayground.view.getCode();
        const originalCode = $(target).data('kotlinOriginalCode');

        trackEvent({
          'eventCategory': 'kotlin-playground',
          'eventAction': 'Playground Run',
          'eventLabel': code === originalCode ? 'unchanged' : 'changed',
        });
      });
}

function addNavigatorType() {
  const html = document.getElementsByTagName('html')[0];

  html.className = html.className.replace('no-js', '');

  // OS detection
  if (navigator.userAgent.indexOf('Linux') > -1)
    html.className += ' os_linux';

  // Browser detection
  if ('chrome' in window)
    html.className += ' ua_chrome';
  else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
    html.className += ' ua_firefox';
}

function initHeadingAnchors() {
  $('h1,h2,h3').each(function (element) {
    const id = this.getAttribute("id");
    if (id == null) return;
    const referenceElement = document.createElement("a");
    referenceElement.className = "anchor";
    referenceElement.href = "#" + id;
    this.appendChild(referenceElement);
  });
}

function initGifPlayer() {
  const elements = document.getElementsByClassName("gif-image");
  Array.prototype.forEach.call(elements, function(el) {
    new GifPlayer(el)
  });
}

function getPropsFromComment(node) {
  let currentNode = null;
  let previousComment = null;

  const iterator = document.createNodeIterator(node.parentNode, NodeFilter.SHOW_ALL);

  while (currentNode = iterator.nextNode()) {
    if (currentNode === node) {
      return JSON.parse(previousComment.nodeValue);
    }

    if (currentNode.nodeType === 8) previousComment = currentNode;
  }

  return {};
}

function initKTLComponentNode({ default: Component }, node) {
  const props = getPropsFromComment(node);
  props.onClick = () => {debugger};
  hydrate(h(Component, props), node);
}

function initKTLComponents() {
  const nodes = $('[data-ktl-type]').toArray().reduce((nodes, node) => {
    const name = node.getAttribute('data-ktl-type');

    nodes[name] = nodes[name] || [];
    nodes[name].push(node);

    return nodes;
  }, {});

  Promise.all(
      Object.entries(nodes)
          .map(([ name, values ]) => import(`../../../@ktl-components/dist/${name}.js`)
          .then(module => values.map(node => initKTLComponentNode(module, node))))
  );
}

$(function () {
  CodeMirror.colorize($('.code._highlighted'));

  // hack to force :active support in mobile Safari
  document.addEventListener("touchstart", function () {}, false);

  initSamples();
  initOverviewCodeExample();
  addNavigatorType();
  initHeadingAnchors();
  initGifPlayer();
  initKTLComponents();
});
