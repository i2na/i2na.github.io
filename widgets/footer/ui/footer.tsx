import React from "react";
import { FOOTER } from "@/config/constants";
import { Icons } from "@/shared/ui/icons";
import styles from "./footer.module.scss";
import cn from "classnames";

export const Footer: React.FC = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2>
                        {FOOTER.content.part1} <br /> {FOOTER.content.part2}
                    </h2>
                    <div className={styles.socialLinks}>
                        {FOOTER.social.map((item) => {
                            const Icon = Icons[item.icon as keyof typeof Icons];
                            if (!Icon) return null;
                            const className = item.icon.toLowerCase();

                            return (
                                <a
                                    key={item.icon}
                                    href={item.url}
                                    className={cn(styles[className])}
                                >
                                    <Icon />
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.meta}>
                        <span>{FOOTER.location}</span>
                        <span>
                            {new Date().getFullYear()} © {FOOTER.name}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
