import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

// --- ESTILOS (DEFINIDOS COMO OBJETOS JAVASCRIPT) ---
const styles = {
    // Layout Principal
    appContainer: { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' },
    nav: { backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', position: 'sticky', top: '0', zIndex: '10' },
    navContent: { maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' },
    navLogo: { fontSize: '1.5rem', fontWeight: '700', color: '#4f46e5', textDecoration: 'none' },
    navLinks: { display: 'flex', alignItems: 'center', gap: '1rem' },
    navLink: { padding: '0.5rem 1rem', color: '#334155', fontWeight: '600', textDecoration: 'none', borderRadius: '0.375rem', cursor: 'pointer' },
    navLinkActive: { backgroundColor: '#eef2ff', color: '#4f46e5' },
    main: { flex: '1 1 0%', width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '1.5rem' },
    footer: { width: '100%', backgroundColor: 'white', textAlign: 'center', padding: '1rem', marginTop: '2rem', borderTop: '1px solid #e2e8f0' },
    footerText: { fontSize: '0.875rem', color: '#64748b' },

    // Componentes Comuns
    loginContainer: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
    loginBox: { width: '100%', maxWidth: '28rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', border: '1px solid #e2e8f0', padding: '2rem' },
    loginTitle: { fontSize: '1.875rem', fontWeight: '700', color: '#1e293b', textAlign: 'center', marginBottom: '1.5rem' },
    loginForm: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    loginButton: { marginTop: '1rem', backgroundColor: '#4f46e5', color: 'white', fontWeight: '700', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' },
    loginHint: { marginTop: '1.5rem', fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' },
    forgotPasswordLink: { fontSize: '0.875rem', color: '#4f46e5', cursor: 'pointer', textAlign: 'center', marginTop: '1rem' },
    inputFieldContainer: { display: 'flex', flexDirection: 'column' },
    inputFieldLabel: { fontSize: '0.875rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' },
    inputField: { width: '100%', padding: '0.75rem 1rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.5rem', boxSizing: 'border-box' },
    
    // Homepage
    homeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', border: '1px solid #e2e8f0' },
    homeTitle: { fontSize: '3rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem', lineHeight: '1.1' },
    homeSubtitle: { fontSize: '1.25rem', color: '#475569', marginBottom: '2.5rem', maxWidth: '42rem' },
    homeButtonContainer: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' },
    homeButtonPrimary: { padding: '1rem 2rem', backgroundColor: '#4f46e5', color: 'white', fontWeight: '700', fontSize: '1.125rem', borderRadius: '0.75rem', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    homeButtonSecondary: { padding: '1rem 2rem', backgroundColor: '#8b5cf6', color: 'white', fontWeight: '700', fontSize: '1.125rem', borderRadius: '0.75rem', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },

    // Painéis
    panel: { width: '100%', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '2rem' },
    panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    panelTitle: { fontSize: '1.875rem', fontWeight: '700', color: '#1e293b' },
    panelSubtitle: { color: '#64748b' },
    logoutButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', fontWeight: '600', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' },
    metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
    metricCard: { backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' },
    metricCardTitle: { fontSize: '0.875rem', fontWeight: '600', color: '#475569' },
    metricCardValue: { fontSize: '1.875rem', fontWeight: '700' },
    tableContainer: { overflowX: 'auto', backgroundColor: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' },
    table: { minWidth: '100%', textAlign: 'left', fontSize: '0.875rem', borderCollapse: 'collapse' },
    tableHead: { borderBottom: '1px solid #cbd5e1' },
    tableHeaderCell: { padding: '1rem', fontWeight: '600', color: '#475569' },
    tableRow: { borderBottom: '1px solid #e2e8f0' },
    tableCell: { padding: '1rem', fontWeight: '500', color: '#1e293b' },
    statusTagBase: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '700', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    statusTagGreen: { backgroundColor: '#dcfce7', color: '#166534' },
    statusTagRed: { backgroundColor: '#fee2e2', color: '#991b1b' },
    
    // Específico do Cliente
    progressBarContainer: { width: '100%', backgroundColor: '#e2e8f0', borderRadius: '9999px', height: '1rem' },
    progressBar: { backgroundColor: '#4f46e5', height: '100%', borderRadius: '9999px' },
    progressText: { display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginTop: '0.5rem' },
    payButton: { width: '100%', maxWidth: '32rem', margin: '0 auto', padding: '1rem 2rem', backgroundImage: 'linear-gradient(to right, #22c55e, #10b981)', color: 'white', fontWeight: '700', fontSize: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', border: 'none', cursor: 'pointer' },
    
    // Abas e Formulário de Cadastro
    tabsContainer: { display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1rem' },
    tabButton: { padding: '0.75rem 1.5rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', color: '#64748b' },
    tabButtonActive: { color: '#4f46e5', borderBottom: '2px solid #4f46e5', marginBottom: '-2px' },
    formSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' },
    checkboxContainer: { display: 'flex', flexWrap: 'wrap', gap: '1rem' },
    checkboxLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' },

    // Modal
    modalOverlay: { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '20' },
    modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '90%', width: '500px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    modalTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
    modalText: { marginBottom: '1.5rem', color: '#475569', lineHeight: '1.6', textAlign: 'left' },
    modalPasswordDisplay: { fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: '700', backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', color: '#1e293b' },
    modalCloseButton: { backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' },
    modalShareButton: { backgroundColor: '#25D366', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600', marginLeft: '1rem' },
};


// --- Componentes ---

const Modal = ({ title, children, onClose }) => (
    <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>{title}</h2>
            {children}
            <button onClick={onClose} style={styles.modalCloseButton}>Fechar</button>
        </div>
    </div>
);

const LoginScreen = ({ title, onSubmit, children, errorMessage, hint, onForgotPassword }) => (
    <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
            <h1 style={styles.loginTitle}>{title}</h1>
            <form onSubmit={onSubmit}>
                <div style={styles.loginForm}>{children}</div>
                {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{errorMessage}</p>}
                <button type="submit" style={styles.loginButton}>Entrar</button>
                <p style={styles.forgotPasswordLink} onClick={onForgotPassword}>Esqueci a minha senha</p>
                {hint && <div style={styles.loginHint}>{hint}</div>}
            </form>
        </div>
    </div>
);

const InputField = ({ id, label, type = 'text', value, onChange, placeholder, step }) => (
    <div style={styles.inputFieldContainer}>
        <label htmlFor={id} style={styles.inputFieldLabel}>{label}</label>
        <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required style={styles.inputField} step={step} />
    </div>
);

const HomePage = () => (
    <div style={styles.homeContainer}>
        <div>
            <h1 style={styles.homeTitle}>Sistema de Gestão de Empréstimos</h1>
            <p style={styles.homeSubtitle}>A sua solução completa e inteligente para gestão de empréstimos, com pagamentos via Pix e automação para o seu negócio.</p>
            <div style={styles.homeButtonContainer}>
                <Link to="/cliente" style={styles.homeButtonPrimary}>Entrar como Cliente</Link>
                <Link to="/agente" style={styles.homeButtonSecondary}>Entrar como Agente</Link>
            </div>
        </div>
    </div>
);

const ClienteApp = ({ clients }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [clientPhone, setClientPhone] = useState('');
    const [clientPassword, setClientPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const foundClient = clients.find(c => c.whatsapp === clientPhone && c.password === clientPassword);
        if (foundClient) {
            setCurrentUser(foundClient);
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Telefone ou senha incorretos.');
        }
    };
    
    if (!isLoggedIn) {
        return (
            <>
                {showForgotModal && (
                    <Modal title="Recuperação de Senha" onClose={() => setShowForgotModal(false)}>
                        <p style={{...styles.modalText, textAlign: 'center'}}>Para recuperar a sua senha, por favor, procure o seu agente imediatamente.</p>
                    </Modal>
                )}
                <LoginScreen
                    title="Login do Cliente"
                    onSubmit={handleLogin}
                    errorMessage={loginError}
                    onForgotPassword={() => setShowForgotModal(true)}
                    hint={<p>Use os dados fornecidos pelo seu agente.</p>}
                >
                    <InputField id="tel" label="Telefone (WhatsApp)" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Ex: 11987654321" />
                    <InputField id="pass" label="Senha" type="password" value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} />
                </LoginScreen>
            </>
        );
    }
    
    if (!currentUser.loan) {
        return (
            <div style={styles.panel}>
                 <header style={styles.panelHeader}>
                    <div><h1 style={styles.panelTitle}>O Meu Empréstimo</h1><p style={styles.panelSubtitle}>Bem-vindo(a) de volta, {currentUser.name}!</p></div>
                    <button onClick={() => setIsLoggedIn(false)} style={styles.logoutButton}>Sair</button>
                </header>
                <p>Ainda não existe um empréstimo ativo para si.</p>
            </div>
        )
    }

    const loan = currentUser.loan;
    const paidInstallments = loan.installments.filter(p => p.status === 'Pago').length;
    const progress = (paidInstallments / loan.installments.length) * 100;
    const outstandingBalance = loan.installments.filter(p=>p.status === 'Pendente').reduce((acc, p) => acc + p.value, 0);

    return (
        <div style={styles.panel}>
            <header style={styles.panelHeader}>
                <div><h1 style={styles.panelTitle}>O Meu Empréstimo</h1><p style={styles.panelSubtitle}>Bem-vindo(a) de volta, {currentUser.name}!</p></div>
                <button onClick={() => setIsLoggedIn(false)} style={styles.logoutButton}>Sair</button>
            </header>
            <main style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                <section style={styles.metricCard}><h2 style={{...styles.panelTitle, fontSize: '1.25rem', marginBottom: '1rem'}}>Resumo</h2><div style={styles.metricsGrid}>
                    <div><h3 style={styles.metricCardTitle}>Valor Original</h3><p style={{...styles.metricCardValue, color: '#1e293b'}}>R$ {loan.loanAmount.toFixed(2)}</p></div>
                    <div><h3 style={styles.metricCardTitle}>Valor da Parcela</h3><p style={{...styles.metricCardValue, color: '#16a34a'}}>R$ {loan.installmentValue.toFixed(2)}</p></div>
                    <div><h3 style={styles.metricCardTitle}>Saldo Devedor</h3><p style={{...styles.metricCardValue, color: '#dc2626'}}>R$ {outstandingBalance.toFixed(2)}</p></div>
                    <div><h3 style={styles.metricCardTitle}>Estado</h3><p><span style={{...styles.statusTagBase, ...(outstandingBalance === 0 ? styles.statusTagGreen : styles.statusTagRed)}}>{outstandingBalance === 0 ? 'Quitado' : 'Em Aberto'}</span></p></div>
                </div></section>
                <section style={styles.metricCard}><h2 style={{...styles.panelTitle, fontSize: '1.25rem', marginBottom: '1rem'}}>Progresso do Pagamento</h2>
                    <div style={styles.progressBarContainer}><div style={{...styles.progressBar, width: `${progress}%`}}></div></div>
                    <div style={styles.progressText}><span>{paidInstallments} / {loan.installments.length} pagas</span><span>{progress.toFixed(0)}%</span></div>
                </section>
                <section style={{textAlign: 'center'}}><button style={styles.payButton}>Pagar Próxima Parcela (R$ {loan.installmentValue.toFixed(2)})</button></section>
            </main>
        </div>
    );
};

const AgenteApp = ({ clients, setClients }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [viewingClient, setViewingClient] = useState(null);
    const [showPasswordOf, setShowPasswordOf] = useState(null);
    const [formState, setFormState] = useState({ name: '', whatsapp: '', loanAmount: '', numInstallments: '', installmentValue: '', type: 'diario', days: [], releaseDate: new Date().toISOString().split('T')[0], paymentDeadline: '18:00', penaltyValue: '', penaltyPercentage: '' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [newClientData, setNewClientData] = useState({ name: '', password: '' });

    const handleLogin = (e) => { e.preventDefault(); setIsLoggedIn(true); };
    const generatePassword = () => Math.random().toString(36).slice(-8);

    const handleRegisterLoan = (e) => {
        e.preventDefault();
        let client = clients.find(c => c.whatsapp === formState.whatsapp);
        let clientPassword = client ? client.password : generatePassword();

        const startDate = new Date(formState.releaseDate + 'T00:00:00-03:00'); // Consider local timezone
        const paymentDays = formState.type === 'diario' ? formState.days.map(d => ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'].indexOf(d)) : [0,1,2,3,4,5,6];
        let currentDate = new Date(startDate);
        let installments = [];
        
        for (let i = 0; i < formState.numInstallments; i++) {
            currentDate.setDate(currentDate.getDate() + 1); // Avança para o dia seguinte
            while (!paymentDays.includes(currentDate.getDay())) {
                currentDate.setDate(currentDate.getDate() + 1);
            }
            installments.push({
                id: i + 1,
                value: parseFloat(formState.installmentValue),
                status: 'Pendente',
                dueDate: new Date(currentDate)
            });
        }
        
        const newLoan = { loanId: Date.now(), loanAmount: parseFloat(formState.loanAmount), installmentValue: parseFloat(formState.installmentValue), installments, penalty: { deadline: formState.paymentDeadline, value: formState.penaltyValue, percentage: formState.penaltyPercentage }};
        if (client) {
            setClients(clients.map(c => c.id === client.id ? { ...c, loan: newLoan, status: 'Em dia' } : c));
        } else {
            setClients([...clients, { id: Date.now(), name: formState.name, whatsapp: formState.whatsapp, password: clientPassword, status: 'Em dia', loan: newLoan }]);
        }
        setNewClientData({ name: formState.name, password: clientPassword });
        setShowSuccessModal(true);
        setFormState({ name: '', whatsapp: '', loanAmount: '', numInstallments: '', installmentValue: '', type: 'diario', days: [], releaseDate: new Date().toISOString().split('T')[0], paymentDeadline: '18:00', penaltyValue: '', penaltyPercentage: '' });
        setActiveTab('clients');
    };
    
    const handleDayChange = (day) => {
        const newDays = formState.days.includes(day) ? formState.days.filter(d => d !== day) : [...formState.days, day];
        setFormState({...formState, days: newDays });
    };

    const handleMarkAsPaid = (clientId, installment) => {
        const updatedClients = clients.map(client => {
            if (client.id === clientId) {
                const updatedInstallments = client.loan.installments.map(inst => inst.id === installment.id ? { ...inst, status: 'Pago', paidDate: new Date() } : inst);
                return { ...client, loan: { ...client.loan, installments: updatedInstallments } };
            }
            return client;
        });
        setClients(updatedClients);
        const currentClient = updatedClients.find(c => c.id === clientId);
        setViewingClient(currentClient);
        setReceiptData({ clientName: currentClient.name, installment });
        setShowReceiptModal(true);
    };

    if (!isLoggedIn) return <LoginScreen title="Login do Agente" onSubmit={handleLogin} hint={<p>Login de demonstração, clique em Entrar.</p>} />;
    if (viewingClient) {
        return (
            <div style={styles.panel}>
                <button onClick={() => setViewingClient(null)} style={{...styles.logoutButton, backgroundColor: '#64748b', alignSelf: 'flex-start'}}>← Voltar</button>
                <header style={styles.panelHeader}><div><h1 style={styles.panelTitle}>{viewingClient.name}</h1><p style={styles.panelSubtitle}>Whatsapp: {viewingClient.whatsapp}</p></div></header>
                <section><h2 style={{...styles.panelTitle, fontSize: '1.25rem', marginBottom: '1rem'}}>Parcelas</h2><div style={styles.tableContainer}><table style={styles.table}>
                    <thead style={styles.tableHead}><tr><th style={styles.tableHeaderCell}>Nº</th><th style={styles.tableHeaderCell}>Vencimento</th><th style={styles.tableHeaderCell}>Valor</th><th style={styles.tableHeaderCell}>Estado</th><th style={styles.tableHeaderCell}>Ação</th></tr></thead>
                    <tbody>{viewingClient.loan.installments.map(inst => (<tr key={inst.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{inst.id}</td><td style={styles.tableCell}>{new Date(inst.dueDate).toLocaleDateString('pt-BR')}</td><td style={styles.tableCell}>R$ {inst.value.toFixed(2)}</td>
                        <td style={styles.tableCell}><span style={{...styles.statusTagBase, ...(inst.status === 'Pago' ? styles.statusTagGreen : styles.statusTagRed)}}>{inst.status}</span></td>
                        <td style={styles.tableCell}>{inst.status === 'Pendente' && <button onClick={() => handleMarkAsPaid(viewingClient.id, inst)} style={{...styles.loginButton, marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Dar Baixa</button>}</td>
                    </tr>))}</tbody>
                </table></div></section>
            </div>
        );
    }
    
    return (
        <div style={styles.panel}>
            {showSuccessModal && <Modal title="Empréstimo Registado!" onClose={() => setShowSuccessModal(false)}><p style={styles.modalText}>Cliente: <strong>{newClientData.name}</strong></p><p style={styles.modalText}>A senha de acesso do cliente é:</p><p style={styles.modalPasswordDisplay}>{newClientData.password}</p></Modal>}
            {showReceiptModal && <Modal title="Recibo de Pagamento" onClose={() => setShowReceiptModal(false)}>
                <p style={styles.modalText}><strong>Cliente:</strong> {receiptData.clientName}</p>
                <p style={styles.modalText}><strong>Data Pag.:</strong> {new Date().toLocaleString('pt-BR')}</p>
                <p style={styles.modalText}><strong>Valor Pago:</strong> R$ {receiptData.installment.value.toFixed(2)} (Ref. Parcela {receiptData.installment.id})</p>
                <hr style={{margin: '1rem 0'}}/>
                <button onClick={() => alert('Recibo partilhado!')} style={{...styles.modalCloseButton, ...styles.modalShareButton}}>Partilhar no WhatsApp</button>
            </Modal>}
            <header style={styles.panelHeader}><div><h1 style={styles.panelTitle}>Painel do Agente</h1><p style={styles.panelSubtitle}>Gestão de empréstimos e clientes.</p></div><button onClick={() => setIsLoggedIn(false)} style={styles.logoutButton}>Sair</button></header>
            <main>
                <div style={styles.tabsContainer}>
                    <button style={activeTab === 'dashboard' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
                    <button style={activeTab === 'clients' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('clients')}>Clientes</button>
                    <button style={activeTab === 'register' ? {...styles.tabButton, ...styles.tabButtonActive} : styles.tabButton} onClick={() => setActiveTab('register')}>Cadastrar Empréstimo</button>
                </div>
                {activeTab === 'dashboard' && <section style={styles.metricsGrid}>
                   <div style={styles.metricCard}><h3 style={styles.metricCardTitle}>A Receber Hoje</h3><p style={{...styles.metricCardValue, color: '#16a34a'}}>R$ 150,00</p></div>
                   <div style={styles.metricCard}><h3 style={styles.metricCardTitle}>A Receber na Semana</h3><p style={{...styles.metricCardValue, color: '#4f46e5'}}>R$ 750,00</p></div>
                   <div style={styles.metricCard}><h3 style={styles.metricCardTitle}>A Receber no Mês</h3><p style={{...styles.metricCardValue, color: '#8b5cf6'}}>R$ 3.000,00</p></div>
                   <div style={styles.metricCard}><h3 style={styles.metricCardTitle}>Clientes em Atraso</h3><p style={{...styles.metricCardValue, color: '#dc2626'}}>1</p></div>
                </section>}
                {activeTab === 'clients' && <section><div style={styles.tableContainer}><table style={styles.table}>
                    <thead style={styles.tableHead}><tr><th style={styles.tableHeaderCell}>Nome</th><th style={styles.tableHeaderCell}>Estado</th><th style={styles.tableHeaderCell}>Senha</th><th style={styles.tableHeaderCell}>Ações</th></tr></thead>
                    <tbody>{clients.map(client => (
                        <tr key={client.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{client.name}</td>
                            <td style={styles.tableCell}><span style={{...styles.statusTagBase, ...(client.status === 'Em dia' ? styles.statusTagGreen : styles.statusTagRed)}}>{client.status}</span></td>
                            <td style={styles.tableCell}>{showPasswordOf === client.id ? client.password : '••••••••'} <button onClick={() => setShowPasswordOf(showPasswordOf === client.id ? null : client.id)} style={{marginLeft: '1rem', cursor: 'pointer', border: 'none', background: 'none', color: '#4f46e5', fontWeight: '600'}}>{showPasswordOf === client.id ? 'Ocultar' : 'Ver'}</button></td>
                            <td style={styles.tableCell}><button onClick={() => { setViewingClient(client); }} style={{...styles.loginButton, marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#64748b' }}>Ver Parcelas</button></td>
                        </tr>
                    ))}</tbody>
                </table></div></section>}
                {activeTab === 'register' && <form onSubmit={handleRegisterLoan} style={styles.formSection}>
                     <h2 style={{...styles.panelTitle, fontSize: '1.25rem'}}>Dados do Novo Empréstimo</h2>
                     <InputField id="name" label="Nome do Cliente" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} placeholder="Nome completo" />
                     <InputField id="whatsapp" label="WhatsApp do Cliente" type="tel" value={formState.whatsapp} onChange={(e) => setFormState({...formState, whatsapp: e.target.value})} placeholder="Apenas números, com DDD" />
                     <div style={styles.formGrid}>
                        <InputField id="loanAmount" label="Valor Emprestado (R$)" type="number" value={formState.loanAmount} onChange={(e) => setFormState({...formState, loanAmount: e.target.value})} placeholder="Ex: 1000.00" step="0.01"/>
                        <InputField id="numInstallments" label="Nº de Parcelas" type="number" value={formState.numInstallments} onChange={(e) => setFormState({...formState, numInstallments: e.target.value})} placeholder="Ex: 30" />
                        <InputField id="installmentValue" label="Valor da Parcela (R$)" type="number" value={formState.installmentValue} onChange={(e) => setFormState({...formState, installmentValue: e.target.value})} placeholder="Ex: 40.00" step="0.01" />
                        <InputField id="releaseDate" label="Data de Liberação" type="date" value={formState.releaseDate} onChange={(e) => setFormState({...formState, releaseDate: e.target.value})} />
                     </div>
                     <div><label style={styles.inputFieldLabel}>Tipo de Empréstimo</label><select value={formState.type} onChange={(e) => setFormState({...formState, type: e.target.value})} style={styles.inputField}><option value="diario">Diário</option><option value="semanal">Semanal</option></select></div>
                     {formState.type === 'diario' && <div><label style={styles.inputFieldLabel}>Dias de Cobrança</label><div style={styles.checkboxContainer}>
                        {['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'].map(day => (
                            <label key={day} style={styles.checkboxLabel}><input type="checkbox" checked={formState.days.includes(day)} onChange={() => handleDayChange(day)} />{day}</label>
                        ))}
                     </div></div>}
                     <h2 style={{...styles.panelTitle, fontSize: '1.25rem', marginTop: '1rem'}}>Regras de Pagamento</h2>
                     <div style={styles.formGrid}>
                        <InputField id="paymentDeadline" label="Horário Limite para Pagamento" type="time" value={formState.paymentDeadline} onChange={(e) => setFormState({...formState, paymentDeadline: e.target.value})} />
                        <InputField id="penaltyValue" label="Valor da Multa (R$)" type="number" value={formState.penaltyValue} onChange={(e) => setFormState({...formState, penaltyValue: e.target.value})} placeholder="Deixar em branco se não aplicar" step="0.01"/>
                        <InputField id="penaltyPercentage" label="Multa em Percentagem (%)" type="number" value={formState.penaltyPercentage} onChange={(e) => setFormState({...formState, penaltyPercentage: e.target.value})} placeholder="Deixar em branco se não aplicar" step="0.01"/>
                     </div>
                     <button type="submit" style={styles.loginButton}>Finalizar Cadastro</button>
                </form>}
            </main>
        </div>
    );
};

export default function App() {    
    const [clients, setClients] = useState([
        { id: 1, name: 'Ana Silva', whatsapp: '21987654321', password: 'anapassword', status: 'Em dia', loan: { loanId: 101, loanAmount: 1000, installmentValue: 50, installments: Array.from({length: 20}, (_, i) => ({id: i+1, value: 50, status: i < 5 ? 'Pago' : 'Pendente', dueDate: new Date(2025, 5, 22 + i)})) } },
        { id: 2, name: 'Bruno Costa', whatsapp: '21912345678', password: 'brunopass', status: 'Em atraso', loan: { loanId: 102, loanAmount: 800, installmentValue: 40, installments: Array.from({length: 20}, (_, i) => ({id: i+1, value: 40, status: i < 10 ? 'Pago' : 'Pendente', dueDate: new Date(2025, 5, 22 + i)})) } },
    ]);

    return (
        <Router>
            <div style={styles.appContainer}>
                <nav style={styles.nav}>
                    <div style={styles.navContent}>
                        <Link to="/" style={styles.navLogo}>Empréstimos</Link>
                        <div style={styles.navLinks}>
                            <NavLink to="/" style={({isActive}) => isActive ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}>Início</NavLink>
                            <NavLink to="/cliente" style={({isActive}) => isActive ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}>App Cliente</NavLink>
                            <NavLink to="/agente" style={({isActive}) => isActive ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}>App Agente</NavLink>
                        </div>
                    </div>
                </nav>
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cliente" element={<ClienteApp clients={clients} />} />
                        <Route path="/agente" element={<AgenteApp clients={clients} setClients={setClients} />} />
                    </Routes>
                </main>
                <footer style={styles.footer}>
                    <p style={styles.footerText}>&copy; 2025 Sistema de Empréstimos. Todos os direitos reservados.</p>
                </footer>
            </div>
        </Router>
    );
}
