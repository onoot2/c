import React from 'react';

const FAQBlock: React.FC = () => {
  return (
    <div className="text-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">FAQ / Информация</h2>
      <div className="space-y-4">
        {/* Вопрос 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Что такое токен-аккаунты?</h3>
          <p className="text-gray-300">
            Токен-аккаунты — это специальные аккаунты в сети Solana, которые содержат информацию о токенах, 
            принадлежащих пользователю. Каждый токен-аккаунт привязан к конкретному токену и хранит его баланс.
          </p>
        </div>

        {/* Вопрос 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Зачем их удалять?</h3>
          <p className="text-gray-300">
            Удаление неиспользуемых токен-аккаунтов помогает сократить «мусор» в вашем кошельке, 
            освобождая место и снижая потенциальные риски путаницы. Это также позволяет вернуть часть арендного депозита, 
            уплаченного за создание этих аккаунтов.
          </p>
        </div>

        {/* Вопрос 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Какие аккаунты можно удалить?</h3>
          <p className="text-gray-300">
            Вы можете удалить только пустые токен-аккаунты, то есть те, на которых нет токенов. 
            Такие аккаунты больше не нужны, и их удаление безопасно для пользователя.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQBlock;
