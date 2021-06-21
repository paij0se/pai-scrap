use regex::Regex;
use std::env;
use std::process::{Command, Stdio};
use std::thread;

fn threads() {
    let test = env::var("URL").expect("Expected a URL");
    const NTHREADS: u32 = 1; // number of threads
    let mut children = vec![];

    for _i in 0..NTHREADS {
        let test = test.clone();
        children.push(thread::spawn(move || {
            let ou = Command::new("curl")
                .arg(test)
                .stdout(Stdio::piped())
                .output()
                .expect("Failed to execute command");

            //let re = Regex::new(r"(https?://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)",).unwrap(); // match all the https and http links
            let re = Regex::new(r"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)").unwrap(); // match all the .png, .jpg, .gif https and http links
            let output = String::from_utf8(ou.stdout).unwrap();
            let formated = re.find_iter(&output);
            for i in formated {
                println!("{}", i.as_str())
            }
        }));
    }

    for child in children {
        let _ = child.join();
    }
}

fn main() {
    threads();
    // 🦀
}
