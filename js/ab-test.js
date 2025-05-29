// js/ab-test.js - Versão 100% testada
(function() {
    // Função para gerar variante verdadeiramente aleatória
    function getRandomVariant() {
        // Usa crypto.getRandomValues() para melhor aleatoriedade
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % 2 === 0 ? 'A' : 'B';
    }

    // Verifica se estamos na página de redirecionamento
    if (window.location.pathname.includes('product-redirect.html')) {
        // Debug: limpa localStorage para testes (remova depois)
        // localStorage.removeItem('abTestVariant');
        
        let variant = localStorage.getItem('abTestVariant');
        
        // Se não tem variante definida ou está forçando pelo URL
        const urlParams = new URLSearchParams(window.location.search);
        const forcedVariant = urlParams.get('variant');
        
        if (forcedVariant && ['A', 'B'].includes(forcedVariant)) {
            variant = forcedVariant;
            console.log('Variante forçada via URL:', variant);
        } else if (!variant) {
            variant = getRandomVariant();
            console.log('Nova variante gerada:', variant);
            localStorage.setItem('abTestVariant', variant);
        } else {
            console.log('Variante existente:', variant);
        }

        // Redirecionamento seguro
        const redirectMap = {
            'A': 'product-page-control.html',
            'B': 'product-page-control-B.html'
        };

        if (redirectMap[variant]) {
            console.log('Redirecionando para:', redirectMap[variant]);
            setTimeout(() => {
                window.location.href = redirectMap[variant];
            }, 100);
        } else {
            console.error('Variante inválida:', variant);
            // Fallback para versão A
            window.location.href = 'product-page-control.html';
        }
    }
})();