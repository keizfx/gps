document.addEventListener('DOMContentLoaded', () => {
    const speedElement = document.getElementById('speed');
    const statusElement = document.getElementById('status');
    const unitElement = document.getElementById('unit');

    if (navigator.geolocation) {
        statusElement.textContent = '位置情報の取得を許可してください...';
        navigator.geolocation.watchPosition(
            (position) => {
                // position.coords に位置情報が含まれる
                // position.coords.speed はメートル/秒 (m/s) で返される
                const speedMs = position.coords.speed;

                if (speedMs !== null && speedMs >= 0) {
                    // m/s を km/h に変換
                    const speedKmh = speedMs * 3.6;
                    speedElement.textContent = speedKmh.toFixed(1); // 小数点以下1桁に丸める
                    unitElement.textContent = ' km/h';
                    statusElement.textContent = '速度を更新中';
                } else {
                    speedElement.textContent = '--';
                    unitElement.textContent = ' km/h';
                    statusElement.textContent = '速度データが利用できません';
                }
            },
            (error) => {
                // エラー処理
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        statusElement.textContent = '位置情報の利用が拒否されました。設定を確認してください。';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        statusElement.textContent = '位置情報が取得できません。電波状況の良い場所でお試しください。';
                        break;
                    case error.TIMEOUT:
                        statusElement.textContent = '位置情報の取得がタイムアウトしました。';
                        break;
                    case error.UNKNOWN_ERROR:
                        statusElement.textContent = '不明なエラーが発生しました。';
                        break;
                }
                speedElement.textContent = '--';
                unitElement.textContent = ' km/h';
                console.error('Geolocation Error:', error);
            },
            {
                enableHighAccuracy: true, // 高精度な位置情報を要求
                maximumAge: 0,            // キャッシュされた位置情報は使用しない
                timeout: 5000             // 5秒以内に位置情報を取得できない場合はタイムアウト
            }
        );
    } else {
        statusElement.textContent = 'お使いのブラウザはGeolocation APIに対応していません。';
        speedElement.textContent = '--';
        unitElement.textContent = ' km/h';
    }
});