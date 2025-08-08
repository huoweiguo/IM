export function formatCommentTime(date) {
    const now = new Date();
    const input = new Date(date);
    const diff = Math.floor((now - input) / 1000); // 秒

    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}月前`;
    return `${Math.floor(diff / 31536000)}年前`;
}

export function formatDateTime(date) {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? '0' + n : n);
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const HH = pad(d.getHours());
    const MM = pad(d.getMinutes());
    const SS = pad(d.getSeconds());
    return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
}
