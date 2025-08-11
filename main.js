const $urlInput = document.getElementById('url');
const $result = document.getElementById('result');


$urlInput.addEventListener('input', (e) => {
  try {
    const url = e.target.value;
    if (!url.trim()) {
      $result.innerHTML = '';
      return;
    }
    process(url);
  } catch (err) {
    $result.innerHTML = `
      <div class="column is-12">
        <article class="message is-danger">
          <div class="message-header">
            <p>Error</p>
          </div>
          <div class="message-body">
            Invalid URL format
          </div>
        </article>
      </div>
    `;
  }
});

function process(url) {
  $result.innerHTML = '';
  
  const urlobj = new URL(url);
  const { protocol, hostname, pathname, port, searchParams } = urlobj;

  const domain = `${protocol}//${hostname}`;
  const cleanedPort = (port && port !== '80' && port !== '443') ? `:${port}` : '';
  const cleanurl = domain + cleanedPort + pathname;

  const urlData = [
    { name: 'domain', value: domain },
    { name: 'url', value: cleanurl},
    { name: 'path', value: pathname },
  ];

  if (searchParams.toString()) {
    const paramsList = [...searchParams.entries()]
      .map(([key, value]) => `
        <p class="is-family-monospace is-size-6 has-text-light">
          <strong>${key}:</strong> <span style="word-break: break-all;">${value}</span>
        </p>
      `)
      .join('');

    urlData.push({
      name: 'search params',
      value: `<div class="is-multiline">${paramsList}</div>`,
    });
  }

  urlData.forEach((item, index) => {
    const column = document.createElement('div');
    column.classList.add('column');

    column.innerHTML = `
      <div class="notification p-3">
        <p class="is-family-monospace is-size-6 has-text-light">
          <strong>${item.name}:</strong>
        </p>
        <p class="is-family-monospace is-size-6 has-text-light" style="word-break: break-all;">
          ${item.value}
        </p>
      </div>
    `;
    $result.appendChild(column);
  });
}