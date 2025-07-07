import styles from "./styles.module.scss";

export function ResumeContent() {
  return (
    <div className={styles.resumeContent}>
      <section>
        <hr style={{ border: "4px solid #567087" }} />
      </section>

      <section className={styles.section}>
        <div className={styles.leftInfo}>基本信息</div>
        <div className={styles.rightInfo}>
          <ul className={styles.list}>
            <li className={styles.listItem}>姓名：赵国超</li>
            <li className={styles.listItem}>性别：男</li>
            <li className={styles.listItem}>联系电话：18267706865</li>
            <li className={styles.listItem}>邮箱：zgc73903632@163.com</li>
            <li className={styles.listItem}>教育经历：2019.9-2023.6 浙江工业大学 数字媒体技术 本科</li>
          </ul>
        </div>
      </section>

      <hr style={{ border: "2px solid #567087" }} />

      <section className={styles.section}>
        <div className={styles.leftInfo}>技能</div>
        <div className={styles.rightInfo}>
          <ul className={styles.list}>
            <li className={styles.listItem}>C#：了解.NET 运行原理，能够使用 C#编写服务器程序</li>
            <li className={styles.listItem}>
              前端：熟悉 HTML5、CSS3 和 JavaScript
              <br />
              熟悉 React，了解 Vue 框架，能够独立开发网站
              <br />
              熟悉浏览器底层原理
              <br />
              了解和使用TypeScript 和 Sass 等语言和工具
              <br />
              了解Webpack和Vite等打包工具，能够对网站进行简单的性能优化
            </li>
            <li className={styles.listItem}>
              后端：能使用Go或者C#开发服务器
              <br />
              熟悉Linux，Docker等相关技术
              <br />
              了解微服务架构
              <br />
            </li>
            <li className={styles.listItem}> 其他： 熟悉Git等代码管理工具</li>
          </ul>
        </div>
      </section>

      <hr style={{ border: "2px solid #567087" }} />

      <section className={styles.section}>
        <div className={styles.leftInfo}>项目经历</div>
        <div className={styles.rightInfo}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="https://www.wxwind.top" target="_blank" rel="noopener noreferrer" className={styles.href}>
                <b>个人网站</b>&ensp;-&ensp;https://www.wxwind.top
              </a>
              <br />
              <a
                href="https://github.com/Wxwind/react-blog"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.href}
              >
                前端使用 React Hooks
              </a>
              <br />
              <a
                href="https://github.com/Wxwind/react-blog-server"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.href}
              >
                后端使用 Go-zero
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="http://www.wxwind.top:8080/" target="_blank" rel="noopener noreferrer" className={styles.href}>
                <b>电商管理后台系统</b>
              </a>
              &ensp;-&ensp;
              <a
                href="https://github.com/Wxwind/vue3-shop"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.href}
              >
                https://github.com/Wxwind/vue3-shop
              </a>
              <br />
              使用Vue3+TS+Scss搭建的电商后台管理系统
            </li>
            <li className={styles.listItem}>
              <a
                href="https://www.bilibili.com/video/BV16Z4y1i7q7/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.href}
              >
                <b>射击对战游戏</b>
              </a>
              &ensp;-&ensp;
              <a href="http://www.wxwind.top:8080/" target="_blank" rel="noopener noreferrer" className={styles.href}>
                https://github.com/Wxwind/2DMutiPlayerGame
              </a>
              <br />
              基于快照同步的网络小游戏，前端 Unity，后端 .NET 6 ，使用 UDP+KCP 和 gRPC 实现与服务器可靠通信
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
