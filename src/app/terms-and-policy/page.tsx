// import Image from 'next/image';
import React from 'react';

// import logo_fesfsus from '../../../../public/assets/images/logo_login.png';

const TermsAndPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
          <div className="mb-8 flex justify-center">
            <div className="relative h-[60px] w-[180px]">
              {/* <Image */}
              {/*   src={logo_fesfsus} */}
              {/*   alt="Logo FESF-SUS" */}
              {/*   fill */}
              {/*   priority */}
              {/*   style={{ objectFit: 'contain' }} */}
              {/* /> */}
            </div>
          </div>

          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Termos de Uso e Política de Privacidade
          </h1>

          <div className="space-y-6 text-gray-700">
            <p className="text-base">
              Ao criar uma conta neste sistema, você concorda com os seguintes termos:
            </p>

            <ol className="ml-6 list-decimal space-y-6">
              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Responsabilidade do Usuário
                </strong>
                <p className="text-base">
                  Você é responsável por manter a confidencialidade das informações de sua conta,
                  incluindo seu login e senha. Quaisquer atividades realizadas através de sua conta
                  são de sua inteira responsabilidade.
                </p>
              </li>

              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Uso Adequado do Sistema
                </strong>
                <p className="text-base">
                  O sistema deve ser utilizado de acordo com as leis aplicáveis e as políticas
                  internas. Não é permitido o uso do sistema para fins ilícitos, imorais ou que
                  infrinjam direitos de terceiros.
                </p>
              </li>

              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Privacidade de Dados
                </strong>
                <p className="text-base">
                  Ao registrar-se, você concorda com a coleta e o uso de seus dados pessoais
                  conforme descrito em nossa Política de Privacidade. Seus dados serão utilizados
                  exclusivamente para fornecer e aprimorar os serviços do sistema.
                </p>
              </li>

              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Modificações e Atualizações
                </strong>
                <p className="text-base">
                  Reservamo-nos o direito de modificar ou atualizar estes termos a qualquer momento,
                  sem aviso prévio. É responsabilidade do usuário revisar periodicamente os termos
                  para se manter informado sobre alterações.
                </p>
              </li>

              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Suspensão e Encerramento da Conta
                </strong>
                <p className="text-base">
                  O sistema reserva o direito de suspender ou encerrar sua conta em caso de violação
                  destes termos, uso indevido ou comportamento considerado prejudicial ao bom
                  funcionamento da plataforma.
                </p>
              </li>

              <li>
                <strong className="mb-2 block font-medium text-gray-900">
                  Aceitação dos Termos
                </strong>
                <p className="text-base">
                  Ao prosseguir com o cadastro, você confirma que leu, entendeu e concorda com todos
                  os termos e condições apresentados. Caso não concorde com algum item, pedimos que
                  não finalize o registro.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPolicy;
